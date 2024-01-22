<template>
  <div class="container mx-auto max-w-2xl">
    <header class="mt-5 flex items-center justify-between">
      <div>
        <NuxtLink to="/" class="p-2 text-xl font-semibold hover:bg-gray-200">Gery</NuxtLink>
      </div>

      <nav class="font-mono">
        <ul class="flex space-x-4">
          <li>
            <NuxtLink to="/">Main</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">About</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <main class="p-2">
      <slot />
    </main>
  </div>
</template>
