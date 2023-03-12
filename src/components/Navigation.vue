<template>
  <header>
    <div class="wrapper p-10">
      <nav
        class="sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 nav-container md:px-10 px-5"
      >
        <div
          class="container flex flex-wrap items-center justify-between mx-auto"
        >
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul
              class="flex flex-col py-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
            >
              <li>
                <RouterLink
                  to="/forside"
                  class="block py-2 pl-3 pr-4 text-white md:p-0 hover:text-indigo-500 text-base font-light"
                  >Forside</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  class="block py-2 pl-3 pr-4 text-white md:p-0 hover:text-indigo-500 text-base font-light"
                  to="/kontakt"
                  >Kontakt</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  class="block py-2 pl-3 pr-4 text-white md:p-0 hover:text-indigo-500 text-base font-light"
                  to="/gaveønsker"
                  >Gaveønsker</RouterLink
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.nav-container {
  background: rgba(167, 139, 250, 0.78);
}
</style>
