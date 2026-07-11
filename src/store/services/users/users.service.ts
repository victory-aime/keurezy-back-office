import { BaseApi } from 'rise-core-frontend';
import { MODELS } from '_types/index';

/**
 * UserService provides methods for handling user-related operations
 * such as fetching all users and creating a new user through API endpoints.
 */
export class UserService extends BaseApi {
  user_info(userId: string) {
    return this.apiService.invoke(this.applicationContext.getApiConfig().USER.INFO, { userId });
  }

  getAllUsers(data: { initialPage: number; limitPerPage: number }) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().USER.ALL_USERS,
      {},
      { params: data },
    );
  }
  getUser(params: { userId: string }) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().USER.ONE_USER,
      {},
      { params },
    );
  }
  update_user(data: MODELS.IUser, id: string) {
    return this.apiService.invoke(this.applicationContext.getApiConfig().USER.UPDATE_USER, data, {
      params: { id },
    });
  }
}
