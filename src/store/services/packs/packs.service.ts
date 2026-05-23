import { BaseApi } from 'rise-core-frontend';

export class PacksService extends BaseApi {
  get_all_packs() {
    return this.apiService.invoke(this.applicationContext.getApiConfig().PACKS.GET_ALL_PACKS);
  }
  add_pack(data: FormData) {}
  update_pack(data: FormData) {}
}
