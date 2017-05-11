Vue.component('month-header', {
  template: '#month-header-template',
  props: [ 'month', ],
  methods: {
    move: function(current_month) {
      this.$emit('notify-change-month', current_month);
    }
  }
});
