/// <reference path="../../../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../../../node_modules/@types/bootstrap/index.d.ts"/>
/// <reference path="../../../node_modules/@types/jqueryui/index.d.ts"/>

class BaseService<T>{
    constructor(private type: string) {}
    
    List:Array<T>;

    Create(data: T) {
        this.List.push(data);
    }

    Delete(data: T){
        var index = this.List.indexOf(data);
        this.List.splice(index,1) ;
    }

    Render(){

    }
}

interface todoItem {
    Content: string;
    Status: todoStatus;
}

enum todoStatus{
    undo,
    done,    
}

class TodoService extends BaseService<todoItem>{
    constructor(){
        super("todoItem");
        this.Init();
    }

    public Render() : void {
        let doneHtml = '';
        let undoHtml = '';
        
        this.List.forEach((item)=>{
            if(item.Status == todoStatus.done){
                doneHtml += `<li>${item.Content}<button class="recover-item btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-share-alt"></span></button><button class="remove-item btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-remove"></span></button></li>`;
            } else if (item.Status == todoStatus.undo){
                undoHtml += `<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />${item.Content}</label></div></li>` ;
            }
        });
        $("#done-items").html(doneHtml);
        $('#sortable').html(undoHtml);
        $('.add-todo').val('');
    }

    Delete(data: todoItem){
        data.Status = todoStatus.done ;
    }



    Init(){
        this.List = new Array<todoItem>();
        // mark task as done
        $('.todolist').on('change','#sortable li input[type="checkbox"]',(evt)=>{
            var self = evt.target;
            var text = $(self).parent().text();
            if($(self).prop('checked')){
                var doneItem = this.List.filter((i)=>{return text == i.Content;})[0];
                this.Delete(doneItem);
                this.Render();
            }
        });

        $('.add-todo').on('keypress',(evt) => {
            evt.preventDefault
            if (evt.which == 13) {
                if($(evt.target).val() != ''){
                    var todo = $(evt.target).val();
                    this.Create(  {
                        Content : $(evt.target).val() ,
                        Status : todoStatus.undo 
                    });
                    this.Render();                 
                }else{
                    // some validation
                }
            }
        });
        
        $('.todolist').on('click', '#done-items li button.recover-item',(evt)=>{
            var text = $(evt.target).parent().parent().text();
            var recoverItem = this.List.filter((i)=>{return text == i.Content;})[0];
            recoverItem.Status = todoStatus.undo ;
            this.Render();
        });

        $('.todolist').on('click','#done-items li button.remove-item' ,(evt)=>{
            var text = $(evt.target).parent().parent().text();
            var removeItem = this.List.filter((i)=>{return text == i.Content;})[0];
            var index = this.List.indexOf(removeItem);
            this.List.splice(index,1) ;
            this.Render();
        });

        $('#checkAll').on('click',(evt)=>{
            this.List.forEach((item)=>{
                item.Status = todoStatus.done;
            });
            this.Render();
        });
        //// mock data
        var buyMilk : todoItem = {
            Content: '買牛奶', 
            Status: todoStatus.undo 
        };
        this.List.push(buyMilk);
        var doHomework : todoItem = {
            Content: '寫作業', 
            Status: todoStatus.done 
        };
        this.List.push(doHomework);
        var feedCat : todoItem = {
            Content: '餵貓咪', 
            Status: todoStatus.undo 
        };
        this.List.push(feedCat);

        //// Render
        this.Render();
    }
}

var todoService = new TodoService();
todoService.Render();