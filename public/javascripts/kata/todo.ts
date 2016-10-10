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

    GetAll(): Array<T> {
         return this.List;
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
        let html = '';
        this.List.forEach((item)=>{
            html += `<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />${item.Content}</label></div></li>` ;
        });
        $('#sortable').html(html);
    }

    Init(){
        this.List = new Array<todoItem>();
        //// mock data
        var buyMilk : todoItem = { 
            Content: '買牛奶', 
            Status: todoStatus.undo 
        };
        this.List.push(buyMilk);
        var doHomework : todoItem = { 
            Content: '寫作業', 
            Status: todoStatus.undo 
        };
        this.List.push(doHomework);
        this.Render();
    }
}

var todoService = new TodoService();
todoService.Render();