<script>
  // function onScanSuccess(qrCodeMessage) {
  //   // handle on success condition with the decoded message
  //   console.log('qrCodeMessage @@@@@@@@@@', qrCodeMessage);
  // }
  // var html5QrcodeScanner = new html5QrCode.Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 });
  // html5QrcodeScanner.render(onScanSuccess);
</script>

<div class="camera-wrapper">
  <div id="reader" />
</div>

<style lang="less">
  .camera-wrapper {
    @apply mt-1 px-1 w-full;
    > div {
      height: 290px;
      @apply text-center text-white bg-black rounded;
    }
  }
</style>
