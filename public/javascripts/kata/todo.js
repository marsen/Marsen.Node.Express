/// <reference path="../../../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../../../node_modules/@types/bootstrap/index.d.ts"/>
/// <reference path="../../../node_modules/@types/jqueryui/index.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseService = (function () {
    function BaseService(type) {
        this.type = type;
    }
    BaseService.prototype.Create = function (data) {
        this.List.push(data);
    };
    BaseService.prototype.Delete = function (data) {
        var index = this.List.indexOf(data);
        this.List.splice(index, 1);
    };
    BaseService.prototype.Render = function () {
    };
    return BaseService;
}());
var todoStatus;
(function (todoStatus) {
    todoStatus[todoStatus["undo"] = 0] = "undo";
    todoStatus[todoStatus["done"] = 1] = "done";
})(todoStatus || (todoStatus = {}));
/**
 * Hover & IntelliSense UI consistency
 * TodoService
*/
var TodoService = (function (_super) {
    __extends(TodoService, _super);
    function TodoService() {
        _super.call(this, "todoItem");
        this.Init();
    }
    TodoService.prototype.Render = function () {
        var doneHtml = '';
        var undoHtml = '';
        this.List.forEach(function (item) {
            if (item.Status == todoStatus.done) {
                doneHtml += "<li>" + item.Content + "<button class=\"recover-item btn btn-default btn-xs pull-right\"><span class=\"glyphicon glyphicon-share-alt\"></span></button><button class=\"remove-item btn btn-default btn-xs pull-right\"><span class=\"glyphicon glyphicon-remove\"></span></button></li>";
            }
            else if (item.Status == todoStatus.undo) {
                undoHtml += "<li class=\"ui-state-default\"><div class=\"checkbox\"><label><input type=\"checkbox\" value=\"\" />" + item.Content + "</label></div></li>";
            }
        });
        $("#done-items").html(doneHtml);
        $('#sortable').html(undoHtml);
        $('.add-todo').val('');
    };
    TodoService.prototype.Delete = function (data) {
        data.Status = todoStatus.done;
    };
    TodoService.prototype.Init = function () {
        var _this = this;
        //// todoList in localStorage         
        var list = window.localStorage.getItem("todoList");
        if (!list) {
            this.List = new Array();
        }
        else {
            this.List = JSON.parse(list);
        }
        window.onbeforeunload = function (evt) {
            window.localStorage.setItem("todoList", JSON.stringify(_this.List));
        };
        // mark task as done
        $('.todolist').on('change', '#sortable li input[type="checkbox"]', function (evt) {
            var self = evt.target;
            var text = $(self).parent().text();
            if ($(self).prop('checked')) {
                var doneItem = _this.List.filter(function (i) { return text == i.Content; })[0];
                _this.Delete(doneItem);
                _this.Render();
            }
        });
        $('.add-todo').on('keypress', function (evt) {
            evt.preventDefault;
            if (evt.which == 13) {
                if ($(evt.target).val() != '') {
                    var todo = $(evt.target).val();
                    _this.Create({
                        Content: $(evt.target).val(),
                        Status: todoStatus.undo
                    });
                    _this.Render();
                }
                else {
                }
            }
        });
        $('.todolist').on('click', '#done-items li button.recover-item', function (evt) {
            var text = $(evt.target).parent().parent().text();
            var recoverItem = _this.List.filter(function (i) { return text == i.Content; })[0];
            recoverItem.Status = todoStatus.undo;
            _this.Render();
        });
        $('.todolist').on('click', '#done-items li button.remove-item', function (evt) {
            var text = $(evt.target).parent().parent().text();
            var removeItem = _this.List.filter(function (i) { return text == i.Content; })[0];
            var index = _this.List.indexOf(removeItem);
            _this.List.splice(index, 1);
            _this.Render();
        });
        $('#checkAll').on('click', function (evt) {
            _this.List.forEach(function (item) {
                item.Status = todoStatus.done;
            });
            _this.Render();
        });
        //// Render
        this.Render();
    };
    return TodoService;
}(BaseService));
var todoService = new TodoService();
