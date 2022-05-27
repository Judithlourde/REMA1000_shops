<template>
    <header class="header">
        <div>
            <img src="/images/logo-rema1000.png" alt="rema 1000 shop logo">
        </div>
    </header>
</template>

<script>
  
</script>

<style>
   /* Header Section-Navigation-bar */
    .header {
        position: fixed;
        top: 0;
        left: 0;
        height: 100px;
        width: 100%;
        /* background-color: blue; */
        display: flex;
        justify-content: center;
        align-items: center;
        /* width: 100vw;
        height: 100px;
        z-index: 200;
        padding: 30px 25px;
        transition: opacity .3s ease-in-out;
        background-color: rgba(255, 255, 255, 0.07); */
        /* Got tips from here: https://css-tricks.com/almanac/properties/b/backdrop-filter/ */
        /* backdrop-filter: saturate(180%) blur(20px);           
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%), 0 -1px 0 0 rgb(0 0 0 / 8%); */
    }

    .header div {
        width: 200px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header div img {
        width: 100%;
    }
</style>