// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require vue/dist/vue
//= require vue-infinite-loading/dist/vue-infinite-loading
//= require bootstrap-sprockets
//= require Calendario/js/jquery.calendario.min
//= require_tree .

$(function() {
  if ($('#app').length) {
    new Vue({
      el: '#app',
      data: function() {
        return {
          month: {},
          lists: [],
          page: 1,
          genres: {},
        }
      },
      mounted: function() {
        this.genre();
      },
      methods: {
        search: function(additional_conditions, callback) {
          if (typeof additional_conditions === 'undefined') var additional_conditions = {};
          if (typeof callback === 'undefined') var callback = null;

          var self = this;
          var conditions = {month: this.month.current};
          $.extend(conditions, this.$refs.search_box.conditions, additional_conditions);

          console.log('App: search_conditions ' + JSON.stringify(conditions));

          $.ajax({
            type: 'GET', url: '/api/v1/histories', dataType: 'json', cache: false,
            data: conditions,
            success: function(data, data_type) {
              if (callback) callback(data);

              self.month = data.month;
              self.lists = self.lists.concat(data.money);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { alert('error occurs!'); }
          });
        },
        change_month: function(month) {
          this.$refs.search_box.reset();
          this.reset();
          this.month.current = month;
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        },
        change_condition: function() {
          this.reset();
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        },
        infinite: function() {
          var self = this;
          setTimeout(function() {
            self.search({page: self.page}, function(data){
              if (data.loaded) {
                self.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
              } else {
                self.page++;
                self.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
              }
            });
          }, 100);
        },
        genre: function() {
          var self = this;
          $.ajax({
            type: 'GET', url: '/api/v1/genres', dataType: 'json', cache: false,
            success: function(data, data_type) {
              self.genres = data;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { alert('error occurs!'); }
          });
        },
        reset: function() {
          this.lists = [];
          this.page = 1;
        },
      }
    });
  }
});
