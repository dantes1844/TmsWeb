import { defineStore } from 'pinia';

import { Localization } from '/@/api/sys/model/localizationModel';
import { getConfigurationApi } from '/@/api/sys/configuration';
import { createStorage } from '/@/utils/cache/storageCache';

export interface Configuration {
  auth?: Auth;
  clock?: Clock;
  currentTenant?: CurrentTenant;
  currentUser?: CurrentUser;
  features?: Features;
  localization?: Localization;
  multiTenancy?: MultiTenancy;
  objectExtensions?: ObjectExtensions;
  setting?: Setting;
  timing?: Timing;
}

export interface Auth {
  grantedPolicies: { [key: string]: string };
  policies: { [key: string]: string };
}

export interface Clock {
  kind: string;
}

export interface CurrentTenant {
  id: string;
  isAvailable: boolean;
  name: string;
}
export interface CurrentUser {
  email: string;
  emailVerified: boolean;
  id: string;
  impersonatorTenantId: string;
  impersonatorTenantName: string;
  impersonatorUserId: string;
  impersonatorUserName: string;
  isAuthenticated: boolean;
  name: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  roles: string[];
  surName: string;
  tenantId: string;
  userName: string;
}
export interface Features {
  values: { [key: string]: string };
}
export interface MultiTenancy {
  isEnabled: boolean;
}
export interface ObjectExtensions {
  enums: { [key: string]: string };
  modules: { [key: string]: string };
}
export interface Setting {
  values: { [key: string]: string };
}
export interface Timing {
  timeZone: {
    iana: { [key: string]: string };
    windows: { [key: string]: string };
  };
}

const defaultConfiguration: Configuration = {
  auth: undefined,
  clock: undefined,
  currentTenant: undefined,
  currentUser: undefined,
  features: undefined,
  localization: undefined,
  multiTenancy: undefined,
  objectExtensions: undefined,
  setting: undefined,
  timing: undefined,
};
const storage = createStorage({
  storage: localStorage,
});

const configurationStorageKey = 'CACHE_CONFIGURATION';
export const useConfigurationStore = defineStore({
  id: 'configuration',
  state: (): Configuration => {
    return { ...defaultConfiguration };
  },
  getters: {
    getCurrentUser(): CurrentUser {
      const { currentUser } = storage.get(configurationStorageKey);
      this.currentUser = currentUser;
      return currentUser;
    },
    getAuth(): Auth {
      const { auth } = storage.get(configurationStorageKey);
      this.auth = auth;
      return auth;
    },
  },
  actions: {
    setCurrentUser(currentUser: CurrentUser | undefined) {
      this.currentUser = currentUser;
    },
    setCurrentTenant(currentTenant: CurrentTenant | undefined) {
      this.currentTenant = currentTenant;
    },
    setClock(clock: Clock | undefined) {
      this.clock = clock;
    },
    setFeatures(features: Features | undefined) {
      this.features = features;
    },
    setLocalization(localization: Localization | undefined) {
      this.localization = localization;
    },
    setMultiTenancy(multiTenancy: MultiTenancy | undefined) {
      this.multiTenancy = multiTenancy;
    },
    setSetting(setting: Setting | undefined) {
      this.setting = setting;
    },
    setTiming(timing: Timing | undefined) {
      this.timing = timing;
    },
    setObjectExtensions(objectExtensions: ObjectExtensions | undefined) {
      this.objectExtensions = objectExtensions;
    },
    setAuth(auth: Auth | undefined) {
      this.auth = auth;
    },
    async initConfiguration() {
      let configuration: Configuration = storage.get(configurationStorageKey);

      if (!configuration) {
        configuration = await getConfigurationApi();
        storage.set(configurationStorageKey, configuration);
      }

      const {
        currentUser,
        currentTenant,
        clock,
        features,
        localization,
        multiTenancy,
        setting,
        timing,
        objectExtensions,
        auth,
      } = configuration;
      this.setCurrentUser(currentUser);
      this.setCurrentTenant(currentTenant);
      this.setClock(clock);
      this.setFeatures(features);
      this.setLocalization(localization);
      this.setMultiTenancy(multiTenancy);
      this.setSetting(setting);
      this.setTiming(timing);
      this.setObjectExtensions(objectExtensions);
      this.setAuth(auth);
    },
  },
});
