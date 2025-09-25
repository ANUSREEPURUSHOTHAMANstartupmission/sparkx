<script>
  import { onMount } from 'svelte';

  // External prop
  export let menu_open;

  // Scroll + navbar state
  let y = 0;
  let pageHeight = 10;
  $: scrolled = y > pageHeight;

  // Dropdown state
  let dropdownOpen = false;   // desktop Cohort 1
  let dropdownOpensm = false; // mobile Cohort 1

  // Optional: close dropdowns with Escape
  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      dropdownOpen = false;
      dropdownOpensm = false;
    }
  };

  // Smooth scroll helpers (kept from your snippet)
  function findPos(obj) {
    let curtop = 0;
    if (obj?.offsetParent) {
      do {
        curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
      return curtop;
    }
    return 0;
  }

  const handleCyclo = (e) => {
    e.preventDefault();
    const button = e.target.closest('[data-target]');
    if (!button) return;
    const target = button.getAttribute('data-target');
    const offset = Number(button.getAttribute('data-offset') || 0);

    window.scroll({
      left: 0,
      top: findPos(document.getElementById(target)) - offset,
      behavior: 'smooth'
    });
  };

  // Desktop dropdown handlers
  const openDD = () => (dropdownOpen = true);
  const closeDD = () => (dropdownOpen = false);

  // Mobile dropdown toggle
  const toggleDDsm = () => (dropdownOpensm = !dropdownOpensm);

  // Menu items for Cohort 1 (edit as needed)
  const cohortMenu = [
    { label: 'Cohort 1', href: '/cohort1' },
  ];
</script>

<!-- Bind scrollY + Escape close -->
<svelte:window bind:scrollY={y} on:keydown={handleKeydown} />

<!-- Top Navbar (desktop + hamburger) -->
<div
  class="fixed space-x-4 md:space-x-0 min-h-fit w-screen sm:min-h-0 left-0
         flex sm:items-center ease-in-out transition-all transform duration-300
         z-50 py-2 {scrolled ? 'bg-white top-0 shadow-md' : 'bg-white text-black'}"
>
  <div class="w-full container mx-auto flex justify-between px-4">
    <!-- Logos -->
    <div class="md:px-2 m-0 font-medium gap-2 w-fit p-0 rounded-md flex items-center justify-center">
      <a href="/">
        <img
          src="{scrolled ? '/img/logo.svg' : '/img/logo.svg'}"
          alt="logo"
          class="items-center justify-center h-12"
        />
      </a>
      <a href="/">
        <img
          src="{scrolled ? '/img/sparkx1.svg' : '/img/sparkx1.svg'}"
          alt="sparkx"
          class="items-center justify-center h-14 z-50"
        />
      </a>
    </div>

    <!-- Desktop links + hamburger -->
    <main class="flex items-start px-7 my-auto">
      <!-- Desktop nav -->
      <div style="font-family: Museo-Sans, sans-serif;" class="flex my-auto">
        <a href="/" class="md:flex cursor-pointer hidden px-4 py-3 md:py-1 uppercase text-sm hover:text-green-900">Home</a>
        <a href="/#about" class="md:flex page-scroll cursor-pointer hidden px-4 py-3 md:py-1 uppercase text-sm hover:text-green-900">About</a>
        <a href="/#Sessions" class="md:flex page-scroll hidden cursor-pointer px-4 py-3 md:py-1 uppercase text-sm hover:text-green-900">Sessions</a>
        <a href="/#Speakers" class="md:flex page-scroll cursor-pointer hidden px-4 py-3 md:py-1 uppercase text-sm hover:text-green-900">Speakers</a>

        <!-- Desktop: Cohort 1 dropdown -->
        <div class="relative md:flex hidden"
             on:mouseenter={openDD}
             on:mouseleave={closeDD}
        >
          <button
            class="px-4 py-3 md:py-1 uppercase text-sm hover:text-green-900 flex items-center gap-1 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            Cohort
            <svg class="w-4 h-4 transition-transform"
                 style={`transform: rotate(${dropdownOpen ? 180 : 0}deg)`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"/>
            </svg>
          </button>

          {#if dropdownOpen}
            <ul
              class="absolute right-0  top-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg focus:outline-none"
              role="menu"
              tabindex="-1"
            >
              {#each cohortMenu as item}
                <li>
                  <a
                    href={item.href}
                    class="block px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                    on:click={() => dropdownOpen = false}
                  >{item.label}</a>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>

      <!-- Mobile hamburger -->
      <div class="flex items-center justify-center bg-white my-auto md:hidden flex">
        <div
          on:click={() => menu_open = !menu_open}
          class="z-50 items-center justify-center my-auto absolute cursor-pointer top-3 right-4 w-10 h-10 text-xs transition duration-150 py-1 rounded bg-transparent block outline-none focus:outline-none"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menu_open}
        >
          <div class="block absolute w-6 h-0.5 rounded-sm bg-black top-5 duration-500 { menu_open ? 'opacity-0' : '' }"></div>
          <div class="block absolute w-6 h-0.5 rounded-sm bg-black top-6 duration-500 { menu_open ? 'transform rotate-45' : '' }"></div>
          <div class="block absolute w-6 h-0.5 rounded-sm bg-black top-7 duration-500 { menu_open ? 'transform -rotate-45' : '' }"></div>
          <div class="block absolute w-6 h-0.5 rounded-sm bg-black top-8 duration-500 { menu_open ? 'opacity-0' : '' }"></div>
        </div>
      </div>
    </main>
  </div>
</div>

<!-- Slide-in Mobile Menu -->
<div
  class="min-h-screen h-20 p-8 sm:py-3 bg-white left-0 top-0
         flex items-center ease-in-out transition-all transform duration-300
         -translate-x-full fixed z-50 {menu_open ? 'translate-x-0' : ''}"
  aria-hidden={!menu_open}
>
  <div class="flex bg-white top-4 absolute">
    <button
      on:click={() => menu_open = !menu_open}
      class="z-50 bg-white cursor-pointer fixed right-5 w-10 h-10 text-xl transition duration-150 leading-none px-2 py-1 rounded bg-transparent block outline-none focus:outline-none"
      type="button"
      aria-label="Close menu"
    >
      <span class="block absolute w-6 h-1 rounded-sm bg-black top-3 duration-500 { menu_open ? 'opacity-0' : '' }"></span>
      <span class="block absolute w-6 h-1 rounded-sm bg-black duration-500 { menu_open ? 'transform rotate-45' : '' }"></span>
      <span class="block absolute w-6 h-1 rounded-sm bg-black duration-500 { menu_open ? 'transform -rotate-45' : '' }"></span>
      <span class="block absolute w-6 h-1 rounded-sm bg-black bottom-2.5 duration-500 { menu_open ? 'opacity-0' : '' }"></span>
    </button>
  </div>

  <div class="w-fit container mx-auto sm:items-center sm:justify-between">
    <div class="mb-8 gap-2 font-medium sm:bg-transparent p-5 sm:p-0 rounded-md flex items-center justify-center">
      <img src="/img/logo.svg" alt="logo" class="md:h-14 h-12" />
    </div>

    <nav>
      <ul class="md:text-sm gap-2 font-data">
        <li on:click={() => menu_open = !menu_open} class="px-5 py-2 transform hover:bg-gray-400 transition duration-500 md:hidden flex">
          <a href="/" class="page-scroll cursor-pointer font-bold">Home</a>
        </li>
        <li on:click={() => menu_open = !menu_open} class="px-5 py-2 transform hover:bg-gray-400 transition duration-500 md:hidden flex">
          <a href="/#about" class="page-scroll cursor-pointer font-bold">About</a>
        </li>
        <li on:click={() => menu_open = !menu_open} class="px-5 py-2 transform hover:bg-gray-400 transition duration-500 md:hidden flex">
          <a href="/#Sessions" class="page-scroll cursor-pointer font-bold">Sessions</a>
        </li>
        <li on:click={() => menu_open = !menu_open} class="px-5 py-2 transform hover:bg-gray-400 transition duration-500 md:hidden flex">
          <a href="/#Speakers" class="page-scroll cursor-pointer font-bold">Speakers</a>
        </li>

        <!-- Mobile: Cohort 1 dropdown -->
        <li class="px-5 py-2 md:hidden flex flex-col">
          <button
            class="w-full text-left font-bold flex items-center justify-between"
            on:click={toggleDDsm}
            aria-haspopup="true"
            aria-expanded={dropdownOpensm}
          >
            Cohort 1
            <svg class="w-4 h-4 transition-transform"
                 style={`transform: rotate(${dropdownOpensm ? 180 : 0}deg)`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"/>
            </svg>
          </button>

          {#if dropdownOpensm}
            <ul class="mt-2 ml-2 border-l border-gray-200">
              {#each cohortMenu as item}
                <li class="pl-3">
                  <a
                    href={item.href}
                    class="block py-2 text-sm hover:underline"
                    on:click={() => { dropdownOpensm = false; menu_open = false; }}
                  >{item.label}</a>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      </ul>
    </nav>
  </div>
</div>
