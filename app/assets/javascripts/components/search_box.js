Vue.component('search-box', {
  template: '#search-box-template',
  props: [ 'month', 'genres' ],
  data: function() {
    return {
      conditions: {},
      is_cal_active: false,
      calendar_instance: null,
      is_genre_active: false,
      monthly_data: {}
    }
  },
  mounted: function() {
    var self = this;
    this.$data.calendar_instance = $('#calendar').calendario({
      fillEmpty: false,
      checkUpdate: false,
      onDayClick: function($el, $content, dateProperties) {
        self.set_calender_condition($el.find('.fc-date').text());
      }
    });
  },
  methods: {
    calendar: function(e) {
      e.preventDefault();

      var self = this;
      var proc = function(data) {
        if (typeof data !== 'undefined') self.monthly_data = data;

        self.is_cal_active = !self.is_cal_active;

        var year_month_array = self.month.current.split('/');
        self.calendar_instance.gotoMonth(year_month_array[1], year_month_array[0]);

        for(var date in self.monthly_data.summary_of_daily) {
          var date_array = date.split('-');
          var calendar_key = date_array[1] + '-' + date_array[2] + '-' + date_array[0];
          var amount = '￥' + self.monthly_data.summary_of_daily[date];
          var obj = {};
          obj[calendar_key] = amount;
          self.calendar_instance.setData(obj);
        }
      };

      if (!Object.keys(this.monthly_data).length) {
        this.set_monthly_data(this.month.current, proc);
        return;
      }

      proc();
    },
    genre: function(e) {
      e.preventDefault();

      var self = this;
      var proc = function(data) {
        if (typeof data !== 'undefined') self.monthly_data = data;

        self.is_genre_active = !self.is_genre_active;
      };

      if (!Object.keys(this.monthly_data).length) {
        this.set_monthly_data(this.month.current, proc);
        return;
      }

      proc();
    },
    set_monthly_data: function(month, callback) {
      $.ajax({
        type: 'GET', url: '/api/v1/monthly', dataType: 'json', cache: false,
        data : {month: month, scope: 'ratio_by_genre,summary_of_daily'},
        success: function(data, data_type) { callback(data); },
        error: function(XMLHttpRequest, textStatus, errorThrown) { alert('error occurs!'); }
      });
    },
    set_calender_condition: function(date) {
      this.set_condition('date', this.month.current + '/' + date);
      this.is_cal_active = !this.is_cal_active;
    },
    set_genre_condition: function(genre_id) {
      this.set_condition('genre', genre_id);
      this.is_genre_active = !this.is_genre_active;
    },
    set_condition: function(key, value) {
      console.log('Searchbox: set ' + key + ' => ' + value);
      this.$set(this.conditions, key, value);
      $('html,body').animate({scrollTop: 0}, 100, 'swing');
      this.search();
    },
    search: function() {
      this.$emit('notify-search');
    },
    reset: function(key) {
      if (key == null) {
        console.log('Searchbox: reset all conditions');
        this.conditions = {};
        this.monthly_data = {};
      } else {
        console.log('Searchbox: [' + key + '] conditions');
        this.$delete(this.conditions, key);
      }
      this.search();
    }
  },
  computed: {
    filterdRatio: function() {
      var self = this;
      if (typeof self.monthly_data.ratio_by_genre === 'undefined') return [];

      return self.monthly_data.ratio_by_genre.filter(function (row) {
        return row.ratio > 3;
      });
    }
  }
});
