import { allow, or } from 'graphql-shield';
import { isAdminAccount, isAuthenticated, isClientAccount, isClientOwnerAccount } from '~/graphQL/utils/rules';

export default {
  Mutation: {
    admin: isAdminAccount,
    login: allow,
    loginAdmin: allow,
    changePassword: isAuthenticated,
    triggerPasswordReset: allow,
    resetPassword: allow,
    createClientAccount: isAdminAccount,
    createCustomerAccount: allow,
    createCustomer: allow,
    createClientAccountUser: or(isClientOwnerAccount, isAdminAccount),
    changeClientUserStatus: isClientOwnerAccount,
    changeClientUserRole: or(isClientOwnerAccount, isAdminAccount),
    deleteClientUser: or(isClientOwnerAccount, isAdminAccount),
  },
  AdminMutation: {
    '*': isAdminAccount,
  },
  Query: {
    customerById: isClientAccount,
    customerStatus: allow,
    customerBvnStatus: allow,
    clientInfo: allow,
    customerSummary: isAuthenticated,
    customer: isAuthenticated,
    customerRemitaStatus: allow,
    clientAccountUsers: or(isClientAccount, isAdminAccount),
  },
  AuthPayload: allow,
  AccountUserActionPayload: allow,
  User: {
    accounts: isAdminAccount,
  },
  Viewer: {
    account: allow,
  },
  Account: {
    '*': allow,
  },
  CustomerStatus: {
    '*': allow,
  },
  CustomerBvnStatus: {
    '*': allow,
  },
  PublicUser: {
    '*': allow,
  },
  AccountConnection: allow,
  AccountEdge: allow,
  ClientInfo: {
    '*': allow,
  },
  CustomerSummary: allow,
  CustomerRemitaStatus: allow,
  SalaryPaymentDetails: allow,
  LoanHistoryDetails: allow,
  FacebookAppKeys: {
    '*': allow,
    appSecret: isClientOwnerAccount,
  },
  ClientAccountUsersPayload: allow,
  UserDetails: allow,
  ContactDetails: allow,
};
