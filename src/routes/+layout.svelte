<script>
    import Header from '$lib/components/Header.svelte';
    import SideBar from '$lib/components/SideBar.svelte';
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap-icons/font/bootstrap-icons.css';
    import * as bootstrap from 'bootstrap';
  
    let { children } = $props();
  </script>
  
  <Header />
  
  <div class="container-fluid py-5 mt-1 mb-4">
    {@render children()}
  </div>
  
  <footer class="navbar bg-body-tertiary fixed-bottom">
    <div class="container-fluid d-flex justify-content-center aling-items-center"><i class="bi bi-rocket-takeoff"></i></div>
  </footer>
  
  <SideBar />