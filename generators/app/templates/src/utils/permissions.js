import { AccessControlList, AppPermission } from '@inrupt/solid-react-components';
import { errorToaster } from '@utils';

// Check that all permissions we need are set. If any are missing, this returns false
const checkAppPermissions = (userAppPermissions, appPermissions) =>
  appPermissions.every(permission => userAppPermissions.includes(permission));

/**
 * SDK app will need all the permissions by the user pod so we check these permissions to work without any issues.
 * Error Message object is to hold the title, message, etc strings, as we can't use i18n libraries in this non-React file
 */
export const checkPermissions = async (webId, errorMessage) => {
  /**
   * Get permissions from trustedApp.
   */
  const userApp = await AppPermission.checkPermissions(webId);
  /**
   * Get modes permissions from solid-react-components
   */
  const permissions = AccessControlList.MODES;
  const { APPEND, READ, WRITE, CONTROL } = permissions;

  // If we are missing permissions that the app requires, display an error message with a Learn More link
  if (!checkAppPermissions(userApp.permissions, [APPEND, READ, WRITE, CONTROL])) {
    errorToaster(errorMessage.message, errorMessage.title, {
      label: errorMessage.label,
      href: errorMessage.href
    });
  }
};
