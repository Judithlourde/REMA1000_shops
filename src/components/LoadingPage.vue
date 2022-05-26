<template>
    <div class="loading">
        <p class="loading__title">Loading...</p>

        <div class="loading__container">
            <img src="/images/rema.png" alt="rema1000 shop logo" class="loading__logo logo">
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style>
    .loading {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 40px;
        animation: loading 2.5s ease-in-out infinite;
    }
    .loading__title {
        font-size: 4em;
        padding: 20px;
       
    }
    .loading__container {
        display: flex;
        justify-content: center;
    }
    .loading__logo {
        width: 30px;
        height: 30px;
        position: relative;
        margin:  2% 25% 0% 25%;
        
    }
    .logo {
        
        width: 100px;
        
    }

    @keyframes loading {
        0%{
			transform: translateX(500px);
		}
		60%{
			transform: translateX(0px);
		}
		62%{
			transform: translateX(60px);
		}
		70%{
			transform: skew(-10deg);
		}
		80%{
			transform: skew(0deg) translateX(0px);
		}
		90%{
			transform: skew(-20deg);
		}
		100%{
			transform: skew(0deg);
		}
    
    }
</style>