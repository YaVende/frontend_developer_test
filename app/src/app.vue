<template lang='pug'>
  div
    strong Bienvenido a YaVende
    |  
    router-link(to='/avisos') Ver avisos

    hr

    router-view
</template>

<script>
  export default {}
</script>
