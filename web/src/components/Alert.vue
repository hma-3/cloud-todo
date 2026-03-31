<script setup lang="ts">
type Props = {
  show: boolean;
  color: "success" | "danger" | "info";
  message: string;
  dismissible?: boolean;
};

withDefaults(defineProps<Props>(), {
  dismissible: false,
});
</script>

<template>
  <teleport to="body">
    <Transition>
      <div v-show="show" class="alert" :class="`alert--${color}`">
        <p class="alert__message">{{ message }}</p>
      </div>
    </Transition>
  </teleport>
</template>

<style scoped lang="scss">
.alert {
  position: fixed;
  bottom: 8px;
  right: 8px;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  z-index: 1000;

  &--info {
    background-color: #d1ecf1;
    border-color: #bee5eb;
    color: #0c5460;
  }

  &--success {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
  }

  &--danger {
    background-color: #f8d7da;
    border-color: #f5c6cb;
    color: #721c24;
  }

  &__message {
    margin: 0;
    font-size: 0.875rem;
  }

  &__close {
    background-color: transparent;
    border: 0;
    color: inherit;
    padding: 0.75rem 1.25rem;
    position: absolute;
    right: 0;
    top: 0;
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    opacity: 0.5;
    text-shadow: 0 1px 0 #fff;
    z-index: 1000;
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
