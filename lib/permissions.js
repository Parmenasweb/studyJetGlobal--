/**
 * Permission levels and their corresponding access rights
 * Using a hierarchical dot notation for granular control
 * Format: module.resource.action
 */
const PERMISSION_LEVELS = {
  superAdmin: [
    // Full system access
    "*",
  ],
  admin: [
    // Finance Module
    "finance.income.create",
    "finance.income.read",
    "finance.income.update",
    "finance.income.delete",
    "finance.income.verify",
    "finance.income.approve",
    "finance.expenses.create",
    "finance.expenses.read",
    "finance.expenses.update",
    "finance.expenses.delete",
    "finance.expenses.approve",
    "finance.reports.view",
    "finance.reports.download",
    "finance.reports.create",
    // Student Module
    "students.create",
    "students.read",
    "students.update",
    "students.delete",
    // Agent Module
    "agents.create",
    "agents.read",
    "agents.update",
    "agents.delete",
    // Settings
    "settings.view",
    "settings.update"
  ],
  financeManager: [
    // Finance Module - Limited
    "finance.income.read",
    "finance.income.verify",
    "finance.income.approve",
    "finance.expenses.read",
    "finance.expenses.verify",
    "finance.expenses.approve",
    "finance.reports.view",
    "finance.reports.download",
    // Limited Student Access
    "students.read",
    // Limited Agent Access
    "agents.read"
  ],
  financeStaff: [
    // Basic Finance Access
    "finance.income.create",
    "finance.income.read",
    "finance.expenses.create",
    "finance.expenses.read",
    "finance.reports.view",
    // Limited Student Access
    "students.read"
  ],
  counselor: [
    // Student-related Permissions
    "students.create",
    "students.read",
    "students.update",
    // Limited Finance Access
    "finance.income.create",
    "finance.income.read",
    // Service-specific Permissions
    "services.consultation.create",
    "services.consultation.read",
    "services.consultation.update",
    "services.documents.create",
    "services.documents.read",
    "services.visa.create",
    "services.visa.read"
  ],
  staff: [
    // Basic Access
    "finance.income.read",
    "finance.expenses.read",
    "students.read",
    "agents.read"
  ]
};

/**
 * Check if a permission pattern matches a specific permission
 * Supports wildcard matching (e.g., "finance.*" matches "finance.income.read")
 */
function matchPermission(pattern, permission) {
  if (pattern === "*") return true;
  if (pattern === permission) return true;
  
  const patternParts = pattern.split(".");
  const permissionParts = permission.split(".");
  
  if (patternParts.length > permissionParts.length) return false;
  
  return patternParts.every((part, index) => {
    return part === "*" || part === permissionParts[index];
  });
}

/**
 * Check if a user has a specific permission
 * @param {Object} user - The user object containing role and custom permissions
 * @param {string} permission - The permission to check
 * @returns {boolean} - Whether the user has the permission
 */
export function hasPermission(user, permission) {
  // No user or no role means no access
  if (!user?.role) return false;

  // SuperAdmin has all permissions
  if (user.role === "superAdmin") return true;

  // Get role-based permissions
  const rolePermissions = PERMISSION_LEVELS[user.role] || [];

  // Check role-based permissions
  const hasRolePermission = rolePermissions.some(p => matchPermission(p, permission));
  if (hasRolePermission) return true;

  // Check custom user permissions if they exist
  if (user.customPermissions?.length > 0) {
    return user.customPermissions.some(p => matchPermission(p, permission));
  }

  return false;
}

/**
 * Get all permissions for a specific role
 * @param {string} role - The role to get permissions for
 * @returns {string[]} - Array of permissions
 */
export function getRolePermissions(role) {
  return PERMISSION_LEVELS[role] || [];
}

/**
 * Check if a user has any of the specified permissions
 * @param {Object} user - The user object containing role information
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean} - Whether the user has any of the permissions
 */
export function hasAnyPermission(user, permissions) {
  return permissions.some(permission => hasPermission(user, permission));
}

/**
 * Check if a user has all of the specified permissions
 * @param {Object} user - The user object containing role information
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean} - Whether the user has all of the permissions
 */
export function hasAllPermissions(user, permissions) {
  return permissions.every(permission => hasPermission(user, permission));
}

/**
 * Get all available roles
 * @returns {string[]} - Array of role names
 */
export function getAvailableRoles() {
  return Object.keys(PERMISSION_LEVELS);
}

/**
 * Check if a role exists
 * @param {string} role - The role to check
 * @returns {boolean} - Whether the role exists
 */
export function isValidRole(role) {
  return role in PERMISSION_LEVELS;
}

/**
 * Get permissions that are common between roles
 * @param {string[]} roles - Array of roles to compare
 * @returns {string[]} - Array of common permissions
 */
export function getCommonPermissions(roles) {
  if (!roles?.length) return [];
  
  const allPermissions = roles.map(role => PERMISSION_LEVELS[role] || []);
  return allPermissions[0].filter(permission =>
    allPermissions.every(rolePermissions =>
      rolePermissions.some(p => matchPermission(p, permission))
    )
  );
}
