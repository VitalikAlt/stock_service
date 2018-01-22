<template>
  <v-app light class="main">
    <!--<div class="background"></div>-->
    <div class="alerts">
      <v-alert v-for="(alert, index) in alerts"
               :key=index
               :color=alert.type
               :icon=alert.icon
               transition="slide-x-reverse-transition"
               value="true">
        {{alert.text}}
      </v-alert>
    </div>

    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        alerts: this.$alerts
      }
    }
  }
</script>

<style>
  .main {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    background: linear-gradient(#2980b9,#2c3e50);
  }

  .background {
    z-index: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: linear-gradient(#2980b9,#2c3e50);
  }

  .alerts {
    position: absolute;
    top: 40px;
    right: 40px;
    width: 300px;
    z-index: 5;
  }

  .right-input {
    padding-right: 0 !important;
  }

  .right-input input {
    text-align: right;
    font-size: 13px !important;
  }

  .right-input input:disabled {
    color: rgba(0,0,0,0.87);
  }

  .column-compressed {
    width: 20px
  }

  .table-select .input-group__selections__comma{
    font-size: 13px;
  }

  .delete-action {
    cursor: pointer;
  }

  .delete-action:hover {
    color: red;
  }

  .tooltip {
    display: block !important;
    z-index: 10000;
  }

  .tooltip .tooltip-inner {
    background: #808080;
    color: #fff;
    border-radius: 3px;
    padding: 5px 10px 4px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
  }

  .tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: #808080;
    z-index: 1;
  }

  .tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }

  .tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }

  .tooltip[x-placement^="bottom"] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  .tooltip[x-placement^="right"] {
    margin-left: 5px;
  }

  .tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .tooltip[x-placement^="left"] {
    margin-right: 5px;
  }

  .tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }

  .tooltip.popover .popover-inner {
    background: #f9f9f9;
    color: black;
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 5px 30px rgba(black, .1);
  }

  .tooltip.popover .popover-arrow {
    border-color: #f9f9f9;
  }

  .tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .35s, visibility .15s;
  }

  .tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .35s;
  }
</style>
