import Header from "../Header";

export default function Today(){
    return(
        <>
            <Header/>
            <div className="today">
                <div className="today-content">
                    <div className="today-content-left">
                        <div className="today-content-left-top">
                            <p>Hoje</p>
                        </div>
                        <div className="today-content-left-bottom">
                            <p>13/04/2020</p>
                        </div>
                    </div>
                    <div className="today-content-right">
                        <div className="today-content-right-top">
                            <p>Não há tarefas para hoje</p>
                        </div>
                        <div className="today-content-right-bottom">
                            <p>Adicione uma tarefa</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}