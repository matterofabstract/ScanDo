<script>
  import FaPlus from 'svelte-icons/fa/FaPlus.svelte';
</script>

<div class="wrapper">
  <button>
    <FaPlus />
  </button>
</div>

<style lang="less">
  .wrapper {
    background: #1f1f1f;
    @apply relative mx-1 mt-2 rounded shadow-inner py-1 mb-2 text-center h-9 shadow;
  }
  button {
    width: 14px;
    color: #797979;
    @apply m-auto h-full;
  }
</style>
