<script>
  import FaArrowDown from 'svelte-icons/fa/FaArrowDown.svelte';
</script>

<div class="wrapper">
  <div class="preview">5HJKSDL3V</div>
  <div class="clear">
    <button>clear</button>
  </div>
</div>
<div class="next">
  <FaArrowDown />
</div>

<style lang="less">
  .wrapper {
    background: #0f0f0f;
    @apply relative mx-1 mt-2 rounded shadow-inner py-1 mb-2;
  }
  .preview {
    color: #e02525;
    @apply text-2xl text-center uppercase;
  }
  .clear {
    color: #5d5d5d;
    @apply absolute top-0 right-0 h-full text-xs pr-3;
    button {
      @apply h-full focus:outline-none;
    }
  }
  .next {
    width: 18px;
    color: #282828;
    @apply m-auto;
  }
</style>
