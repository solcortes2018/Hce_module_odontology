<script lang ="ts">
import { ref } from "vue";

let piezas: any = [18, 17, 16, 15, 14, 13, 12, 11],
const piezas_seleccionadas = ref<any>([])


const created = () => {
    crear_piezas();
}


const crear_piezas: any = () => {
    piezas = piezas.map((element: any) => {
        return {
            caras: Array.from(Array(5).keys()),
            titulo: element
        }
    })
}

const isActive = (value: any) => {
    return piezas_seleccionadas.includes(value)
}

const SeleccionarPieza = async (pieza: any, cara: any) => {
    let referencia = `${pieza}_${cara}`
    let selecionada = piezas_seleccionadas.includes(referencia)
    if (selecionada) {
        return piezas_seleccionadas.splice(piezas_seleccionadas.indexOf(referencia), 1)
    }
    piezas_seleccionadas.push(`${pieza}_${cara}`)
}


</script>
  


<template>
    <div class="">

        <ul>
            <li v-for="pieza in piezas">
                <div class="pieza_completa">
                    <div :ref="`${pieza.titulo}_${cara}`" @click="SeleccionarPieza(pieza.titulo, cara)"
                        v-for="cara in pieza.caras" class="cara-pieza"
                        :class="[`cara-pieza__${cara}`, { 'active': isActive(`${pieza.titulo}_${cara}`) }]" role="button">
                    </div>
                </div>
                <h2><b>{{ pieza.titulo }}</b></h2>
            </li>
        </ul>

        <h3>Piezas Seleccionadas</h3>

        <i v-for="referencia in piezas_seleccionadas">{{ referencia }} /</i>

    </div>
</template>
  
  
<style scoped>
html,
body {
    color: #35495e;
}

i {
    margin-right: 5px;
}

.active {
    background-color: #41b883 !important;
}

.pieza_completa {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transition: box-shadow .3s ease-in-out;
    -moz-transition: box-shadow .3s ease-in-out;
    transition: box-shadow .3s ease-in-out;
    position: relative;
    border: 2px solid #35495e;
    border-radius: 250%;
    width: 80px;
    height: 80px;
    overflow: hidden;
    font-size: 0;
    box-sizing: content-box;
    margin: 10px;
}

li {
    display: inline-block;
    box-sizing: content-box;
}

.cara-pieza {
    display: inline-block;
    box-sizing: content-box;
    border: 1px solid #35495e;
    background-color: #fff;
    width: 38px;
    height: 38px;
}

.cara-pieza:hover {
    background-color: #41b883;
}

.cara-pieza__0,
.cara-pieza__1 {
    border-top: 1px solid #fff !important;
}

.cara-pieza__0,
.cara-pieza__2 {
    border-left: 1px solid #fff !important;
}

.cara-pieza__1,
.cara-pieza__3 {
    border-right: 1px solid #fff !important;
}

.cara-pieza__2,
.cara-pieza__3 {
    border-bottom: 1px solid #fff !important;
}

.cara-pieza__4 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
}</style>