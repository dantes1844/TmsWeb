<template>
  <PageWrapper title="修改当前用户密码" content="修改成功后会自动退出当前登录！">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';

  import { formSchema } from './pwd.data';
  import { resetPassword } from '/@/api/sys/user';
  import { useConfigurationStore } from '/@/store/modules/configuration';
  import { PageEnum } from '/@/enums/pageEnum';
  import { router } from '/@/router';
  import { useUserStore } from '/@/store/modules/user';

  const userStore = useUserStore();

  export default defineComponent({
    name: 'ChangePassword',
    components: { BasicForm, PageWrapper },
    setup() {
      const [register, { validate, resetFields }] = useForm({
        size: 'large',
        baseColProps: { span: 24 },
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          const { passwordOld, passwordNew } = values;
          const store = useConfigurationStore();
          const { id } = store.getCurrentUser;
          await resetPassword({
            userId: id,
            password: passwordNew,
            oldPassword: passwordOld,
            resetToken: 'any character',
          });
          userStore.setToken(undefined);
          userStore.setSessionTimeout(true);
          router.push(PageEnum.BASE_LOGIN);
        } catch (error) {}
      }

      return { register, resetFields, handleSubmit };
    },
  });
</script>
