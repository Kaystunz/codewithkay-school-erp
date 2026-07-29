import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { initialAccounts } from "../data/accounts";

import type {
  Account,
  AccountFormData,
  AccountStatus,
  AccountSubmitResult,
  PasswordResetResult,
} from "../types/account";

const ACCOUNTS_STORAGE_KEY =
  "fareedah-accounts";

const emptyFormData: AccountFormData = {
  name: "",
  email: "",
  password: "",
  role: "Teacher",
  status: "Active",
  linkedRecordId: "",
};

function loadAccounts(): Account[] {
  const storedAccounts = localStorage.getItem(
    ACCOUNTS_STORAGE_KEY
  );

  if (!storedAccounts) {
    return initialAccounts;
  }

  try {
    const parsedAccounts =
      JSON.parse(storedAccounts) as Account[];

    return parsedAccounts;
  } catch {
    localStorage.removeItem(
      ACCOUNTS_STORAGE_KEY
    );

    return initialAccounts;
  }
}

export function useAccounts() {
  const [accounts, setAccounts] =
    useState<Account[]>(loadAccounts);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [
    isPasswordModalOpen,
    setIsPasswordModalOpen,
  ] = useState(false);

  const [selectedAccount, setSelectedAccount] =
    useState<Account | null>(null);

  const [editingAccountId, setEditingAccountId] =
    useState<number | null>(null);

  const [formData, setFormData] =
    useState<AccountFormData>(
      emptyFormData
    );

  useEffect(() => {
    localStorage.setItem(
      ACCOUNTS_STORAGE_KEY,
      JSON.stringify(accounts)
    );
  }, [accounts]);

  const activeAccounts = useMemo(
    () =>
      accounts.filter(
        (account) =>
          account.status === "Active"
      ).length,
    [accounts]
  );

  const disabledAccounts = useMemo(
    () =>
      accounts.filter(
        (account) =>
          account.status === "Disabled"
      ).length,
    [accounts]
  );

  const adminAccounts = useMemo(
    () =>
      accounts.filter(
        (account) =>
          account.role === "Admin"
      ).length,
    [accounts]
  );

  const filteredAccounts = useMemo(() => {
    const normalizedSearchTerm =
      searchTerm.trim().toLowerCase();

    return accounts.filter((account) => {
      const matchesSearch =
        !normalizedSearchTerm ||
        account.name
          .toLowerCase()
          .includes(normalizedSearchTerm) ||
        account.email
          .toLowerCase()
          .includes(normalizedSearchTerm);

      const matchesRole =
        roleFilter === "All" ||
        account.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" ||
        account.status === statusFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [
    accounts,
    roleFilter,
    searchTerm,
    statusFilter,
  ]);

  function openAddModal() {
    setEditingAccountId(null);
    setFormData(emptyFormData);
    setIsModalOpen(true);
  }

  function openEditModal(account: Account) {
    setEditingAccountId(account.id);

    setFormData({
      name: account.name,
      email: account.email,
      password: "",
      role: account.role,
      status: account.status,
      linkedRecordId:
        account.linkedRecordId?.toString() ??
        "",
    });

    setIsModalOpen(true);
  }

  function closeAccountModal() {
    setIsModalOpen(false);
    setEditingAccountId(null);
    setFormData(emptyFormData);
  }

  function handleSubmit():
    AccountSubmitResult {
    const name = formData.name.trim();

    const email = formData.email
      .trim()
      .toLowerCase();

    const password =
      formData.password.trim();

    if (!name) {
      return {
        success: false,
        message: "Account name is required.",
      };
    }

    if (!email) {
      return {
        success: false,
        message: "Email address is required.",
      };
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return {
        success: false,
        message:
          "Enter a valid email address.",
      };
    }

    const emailAlreadyExists =
      accounts.some(
        (account) =>
          account.email.toLowerCase() ===
            email &&
          account.id !== editingAccountId
      );

    if (emailAlreadyExists) {
      return {
        success: false,
        message:
          "An account with this email already exists.",
      };
    }

    if (
      editingAccountId === null &&
      password.length < 6
    ) {
      return {
        success: false,
        message:
          "Password must contain at least 6 characters.",
      };
    }

    const linkedRecordId =
      formData.linkedRecordId.trim()
        ? Number(formData.linkedRecordId)
        : undefined;

    if (
      linkedRecordId !== undefined &&
      (!Number.isInteger(linkedRecordId) ||
        linkedRecordId <= 0)
    ) {
      return {
        success: false,
        message:
          "Linked record ID must be a positive number.",
      };
    }

    if (editingAccountId !== null) {
      setAccounts((currentAccounts) =>
        currentAccounts.map((account) =>
          account.id === editingAccountId
            ? {
                ...account,
                name,
                email,
                role: formData.role,
                status: formData.status,
                linkedRecordId,
                password:
                  password || account.password,
              }
            : account
        )
      );

      closeAccountModal();

      return {
        success: true,
        action: "updated",
      };
    }

    const nextId =
      accounts.length > 0
        ? Math.max(
            ...accounts.map(
              (account) => account.id
            )
          ) + 1
        : 1;

    const newAccount: Account = {
      id: nextId,
      name,
      email,
      password,
      role: formData.role,
      status: formData.status,
      linkedRecordId,
      phone: "",
      address: "",
      profileImage: "",
      createdAt: new Date().toISOString(),
      lastLoginAt: null,
    };

    setAccounts((currentAccounts) => [
      newAccount,
      ...currentAccounts,
    ]);

    closeAccountModal();

    return {
      success: true,
      action: "created",
    };
  }

  function changeAccountStatus(
    accountId: number,
    status: AccountStatus
  ) {
    setAccounts((currentAccounts) =>
      currentAccounts.map((account) =>
        account.id === accountId
          ? {
              ...account,
              status,
            }
          : account
      )
    );
  }

  function openPasswordModal(
    account: Account
  ) {
    setSelectedAccount(account);
    setIsPasswordModalOpen(true);
  }

  function closePasswordModal() {
    setSelectedAccount(null);
    setIsPasswordModalOpen(false);
  }

  function resetPassword(
    accountId: number,
    newPassword: string
  ): PasswordResetResult {
    const trimmedPassword =
      newPassword.trim();

    if (trimmedPassword.length < 6) {
      return {
        success: false,
        message:
          "Password must contain at least 6 characters.",
      };
    }

    setAccounts((currentAccounts) =>
      currentAccounts.map((account) =>
        account.id === accountId
          ? {
              ...account,
              password: trimmedPassword,
            }
          : account
      )
    );

    closePasswordModal();

    return {
      success: true,
    };
  }

  function findAccountByCredentials(
    email: string,
    password: string
  ) {
    const normalizedEmail =
      email.trim().toLowerCase();

    return accounts.find(
      (account) =>
        account.email.toLowerCase() ===
          normalizedEmail &&
        account.password === password
    );
  }

  function updateLastLogin(
    accountId: number
  ) {
    const loginTime =
      new Date().toISOString();

    setAccounts((currentAccounts) =>
      currentAccounts.map((account) =>
        account.id === accountId
          ? {
              ...account,
              lastLoginAt: loginTime,
            }
          : account
      )
    );
  }

  function updateAccountProfile(
    accountId: number,
    profileData: {
      name: string;
      phone: string;
      address: string;
      profileImage: string;
    }
  ) {
    setAccounts((currentAccounts) =>
      currentAccounts.map((account) =>
        account.id === accountId
          ? {
              ...account,
              ...profileData,
            }
          : account
      )
    );
  }

  return {
    accounts,
    filteredAccounts,
    activeAccounts,
    disabledAccounts,
    adminAccounts,

    searchTerm,
    setSearchTerm,

    roleFilter,
    setRoleFilter,

    statusFilter,
    setStatusFilter,

    isModalOpen,
    setIsModalOpen,

    isPasswordModalOpen,
    setIsPasswordModalOpen,

    selectedAccount,
    editingAccountId,
    isEditing:
      editingAccountId !== null,

    formData,
    setFormData,

    openAddModal,
    openEditModal,
    closeAccountModal,
    handleSubmit,

    changeAccountStatus,

    openPasswordModal,
    closePasswordModal,
    resetPassword,

    findAccountByCredentials,
    updateLastLogin,
    updateAccountProfile,
  };
}