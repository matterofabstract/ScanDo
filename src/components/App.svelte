<script>
  import AppTitleBar from './AppTitleBar.svelte';
  import CameraReader from './CameraReader.svelte';
  import ResultDisplay from './ResultDisplay.svelte';
  import AddNewStep from './AddNewStep.svelte';
</script>

<main>
  <AppTitleBar title="ScanDo" />
  <CameraReader />
  <ResultDisplay />
  <AddNewStep />
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @font-face {
    font-family: 'Operator Mono Bold';
    src: url('/build/fonts/OperatorMono-Bold.woff') format('woff');
  }

  @font-face {
    font-family: 'Operator Mono Bold Italic';
    src: url('/build/fonts/OperatorMono-BoldItalic.woff') format('woff');
  }

  @font-face {
    font-family: 'Operator Mono Extra Light';
    src: url('/build/fonts/OperatorMono-XLight.woff') format('woff');
  }

  @font-face {
    font-family: 'Operator Mono Extra Light Italic';
    src: url('/build/fonts/OperatorMono-XLightItalic.woff') format('woff');
  }

  @font-face {
    font-family: 'Operator Mono Light';
    src: url('/build/fonts/OperatorMono-Light.woff') format('woff');
  }

  @font-face {
    font-family: 'Operator Mono Light Italic';
    src: url('/build/fonts/OperatorMono-LightItalic.woff') format('woff');
  }

  @font-face {
    font-family: 'Operator Mono Book';
    src: url('/build/fonts/OperatorMono-Book.woff') format('woff');
  }

  @font-face {
    font-family: 'Operator Mono Book Italic';
    src: url('/build/fonts/OperatorMono-BookItalic.woff') format('woff');
  }

  @font-face {
    font-family: 'Operator Mono Medium';
    src: url('/build/fonts/OperatorMono-Medium.woff') format('woff');
  }

  @font-face {
    font-family: 'Operator Mono Medium Italic';
    src: url('/build/fonts/OperatorMono-MediumItalic.woff') format('woff');
  }

  body {
    background: #191919;
    @apply w-screen h-screen;
  }
</style>
