<template>
    <main id="app">
        <nav id="nav">
            <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
        </nav>
        <router-view />
    </main>
</template>

<style lang="scss">
:root {
    --primary-color: #ff6f00;
    --secondary-color: #402e32;
    --tertiary-color: #b5876d;
    --bg-color: #fff7f0;
    --text-color: #fff;
}

html {
    font-size: 20px;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

:focus {
  outline: none;
}

#app {
    font-family: "Oxanium", Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: var(--bg-color);
    color: #2c3e50;
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

#nav {
    height: 5vh;
    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

button {
    font-family: "Oxanium", Avenir, Helvetica, Arial, sans-serif;
    border: none;
    background-color: transparent;
}

hr {
    margin: 20px 0;
}
</style>
