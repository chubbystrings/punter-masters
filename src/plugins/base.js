import Vue from 'vue';
import BaseOverlay from '@/components/base/Overlay.vue';
import BaseAlert from '@/components/base/Alert.vue';
import BasePagination from '@/components/base/Pagination.vue';
import BaseDialog from '@/components/base/ActionDialog.vue';
import BaseReset from '@/components/base/PasswordReset.vue';
import BaseBack from '@/components/base/Goback.vue';
import BaseCard from '@/components/base/BaseCard.vue';

Vue.component(BaseOverlay.name, BaseOverlay);
Vue.component(BaseAlert.name, BaseAlert);
Vue.component(BasePagination.name, BasePagination);
Vue.component(BaseDialog.name, BaseDialog);
Vue.component(BaseReset.name, BaseReset);
Vue.component(BaseBack.name, BaseBack);
Vue.component(BaseCard.name, BaseCard);
