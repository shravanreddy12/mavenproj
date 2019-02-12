package devops-1.core;

import java.security.PermissionCollection;

import org.eclipse.scout.rt.shared.services.common.security.AbstractAccessControlService;

public class AccessControlService extends AbstractAccessControlService<String> {

  @Override
  protected String getCurrentUserCacheKey() {
    return getUserIdOfCurrentUser();
  }

  @Override
  protected PermissionCollection execLoadPermissions(String userId) {
    return null;
  }
}
