/// <reference path="../../../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../../../node_modules/@types/bootstrap/index.d.ts"/>
/// <reference path="../../../node_modules/@types/jqueryui/index.d.ts"/>

class BaseService<T>{
    constructor(private type: string) {}
    
    List = new  Array<T>() ;

    Create(data: T) {
        
    }

    Update(date: T){

    }

    Delete(data: T){

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
