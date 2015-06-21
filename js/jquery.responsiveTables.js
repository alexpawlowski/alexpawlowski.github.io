/*! Responsive Tables jQuery plugin authored by Yellow Pencil Inc.
 * http://yellowpencil.com
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory($);
    }
}(function ($) {

    "use strict";

    var pluginName = "ResponsiveTables";
    var defaults = {breakpoint:1024};

// plugin constructor
    function ResponsiveTables (element, options) {
        this.settings = $.extend({}, options, {});
        this._defaults = defaults;
        this._name = pluginName;
        this.component = element;
        this.$element = $(element);
        this.table = $(this.component);
        if (!element)return;

        this.init();
    }

// create the component
    var p = ResponsiveTables.prototype = {
        init: function () {
            this.config();
        }
    };

    p.config = function () {
        this.cachedSize = {
            parentWidth:this.table.parent().width(),
            clientWidth: this.component.clientWidth
        };
        $(window).on('resize',function(){
            if(this.cachedSize.clientWidth > this.cachedSize.parentWidth || $(window).width() <= this.settings.breakpoint){
                this.fixResponsiveTable();
            }else{
                this.removeResponsiveTable();
            }
        }.bind(this));

        this.setup(false);
    };

    p.setup = function(reset){
        // turn on all tables before so we can check there widths
        // then turn them off based on there tabs
        this.table.parent().removeClass('horizontalTable');

        if(this.cachedSize.clientWidth > this.cachedSize.parentWidth || $(window).width() <= this.settings.breakpoint){
            this.fixResponsiveTable();
        }else{
            this.table.parent().parent().css({'opacity':''});
        }
    };

    p.removeResponsiveTable = function(){
        this.table.parent().removeClass('horizontalTable');
        this.table.parent().parent().css({'opacity':''});
        $('.horizontal').remove();
        this.table.css('width','');
        this.table.find('tbody tr td').css({height:'',paddingTop:''});
    };

    // set the responsive table class and fix the height of the rows
    // eventually we will move this out to its own plugin
    p.fixResponsiveTable = function(){
        // wait to show the table because of a safari drawing issue
        if(this.table.parent().hasClass('horizontalTable')){  return; }

        this.table.parent().addClass('horizontalTable');
        // wait for the next dom render tick
        setTimeout(function(){

            this.fixHeight();

            var tableHolder = this.table.parent();
            if(navigator.appName == 'Microsoft Internet Explorer') {
                var body = tableHolder.find('tbody');
                var w = ((body.children().length) * 90);
                body.css({width:w});
                this.table.css({width:w + 130});
            }

            // force safari to repaint.. sucks :/
            if(navigator.appName != 'Microsoft Internet Explorer') {
                this.table[0].style.display = 'none';
                setTimeout(function () {
                    this.table[0].style.display = '';
                }.bind(this), 2);
            }
        }.bind(this),2);
    };

    // fixes the height of the git rows to match there respective
    // table header height;
    p.fixHeight = function(){
        // Update all horizontal tables
        var heightMap = [];
        this.table.find('thead th').each(function(index, item){
            var height = item.offsetHeight;
            heightMap[index] = height;

        });
        this.table.find('tbody tr').each(function(index,item){
            var rows = $(item).children('td');
            for(var i=0;i<rows.length;i++){
                var row = rows[i];
                row.style.height = heightMap[i]+"px";
               // row.style.paddingTop = (heightMap[i] / 3) +"px";
            }
        });
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function (options) {
        options = options || {};
        options = $.extend({}, defaults, options);
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new ResponsiveTables(this, options));
            }else{
                // on change directions it resets the tables.
                // we need to return this stuff;
                var responsive = $.data(this, "plugin_" + pluginName);
                responsive.setup(true);

            }
        });
    };

}));

