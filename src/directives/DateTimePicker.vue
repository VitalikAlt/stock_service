<template>
  <div>
    <v-menu
      lazy
      :close-on-content-click="false"
      v-model="menu"
      transition="scale-transition"
      offset-y
      full-width
      :nudge-right="40"
      max-width="290px"
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="formatedDate"
        class="right-input"
        prepend-icon="event"
        readonly
      ></v-text-field>
      <v-tabs ref="tabs" :value="selectedTab" grow icons light>
        <v-tabs-bar slot="activators">
          <v-tabs-item href="#calendar">
            <v-icon>event</v-icon>
          </v-tabs-item>
          <v-tabs-item href="#timer">
            <v-icon>access_time</v-icon>
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-content
          id="calendar">
          <v-date-picker
            v-model="dateModel"
            no-title
            scrollable
            actions
            @input="checkHours"
          ></v-date-picker>
        </v-tabs-content>
        <v-tabs-content
          id="timer">
          <v-time-picker
            ref="timer"
            v-model="timeModel"
            no-title
            scrollable
            format="24hr"
            actions
            @input="checkMinutes"
          ></v-time-picker>
        </v-tabs-content>
      </v-tabs>
    </v-menu>
  </div>
</template>

<script>
  export default {
    name: 'ReservesModal',
    props: ['datetime'],
    data() {
      return {
        dateModel: '',
        timeModel: '',
        menu:false,
        selectedTab:"calendar"
      }
    },
    watch: {
      menu(val) {
        if (val) {
          this.selectedTab="calendar";

          if(this.$refs.timer)
            this.$refs.timer.selectingHour=true
        }
      }
    },
    computed: {
      actualDatetime() {
        return new Date(this.dateModel+' '+this.timeModel+':00');
      },
      formatedDate() {
        const datetime = new Date(this.dateModel+' '+this.timeModel+':00');
        return this.$moment(datetime).format("DD/MM/YYYY HH:mm")
      }
    },
    methods: {
      checkMinutes(val) {
        if(this.$refs.timer.selectingHour===false) {
          this.timeModel=val;
          this.$refs.timer.selectingHour = true;
          this.selectedTab="calendar";
          this.menu=false;
          this.$emit('update',this.actualDatetime)
        }
      },
      checkHours(val) {
        this.dateModel=val;
        this.selectedTab="timer"
      }
    },
    created() {
      const datetime = this.datetime || new Date();
      this.dateModel = this.$moment(datetime).format("YYYY-MM-DD");
      this.timeModel = this.$moment(datetime).format("HH:mm:ss");
    }
  }
</script>

<style scoped>

</style>
