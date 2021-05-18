<script>
  import MdSettings from 'svelte-icons/md/MdSettings.svelte';

  export let title;
</script>

<section>
  <button>
    <MdSettings />
  </button>
  <div>{title}</div>
</section>

<style lang="less">
  section {
    -webkit-app-region: drag;
    font-family: 'Operator Mono Book', san-serif;
    @apply text-sm text-center text-gray-500 select-none;
  }
  button {
    width: 16px;
    right: 4px;
    top: 3px;
    @apply absolute outline-none transition-colors duration-100;
    &:hover {
      @apply text-gray-400 cursor-pointer;
    }
    &:active {
      @apply opacity-90;
    }
  }
</style>
