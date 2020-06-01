import React, { Component, useRef, useEffect } from "react";
import { Calendar, momentLocalizer, Views, Navigate } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/zh-cn'
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './rbcLocal/local.scss'
import config from './rbcLocal/config.ts'

moment.locale('zh-cn')
const localizer = momentLocalizer(moment);
// localizer.messages.today = '今天'
console.log(localizer)
class App extends Component {
  state = {
    date: new Date(),
    events: [
      {
        start: moment().toDate(),
        end: moment()
          .add(1, "hours")
          .toDate(),
        title: "Some titleSome titleSome titleSome titleSome titleSome titleSome titleSome titleSome titleSome title",
        id: 1,
        className:'111'
      }, 
      // {
      //   start: moment().add('hours', 2).toDate(),
      //   end: moment()
      //     .add(1, "days").add('hours', 3)
      //     .toDate(),
      //   title: "const BackFoodModal: React.FC<Props>const BackFoodModal: React.FC<Props>"
      // }
    ]
  };
  handleSelect = (area) => {
    const { start, end } = area
    const title = window.prompt('new event')
    if (title) {
      this.setState({
        events: [...this.state.events, { start, end, title }]
      })
    }
  }
  render() {
    return (
      <div className="App">
        <Calendar
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          date={this.state.date}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
          messages={config}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
          components={{
            event: MyEvent
          }}
          onNavigate={(date, view, navigate)=> {
            this.setState({ date })
            console.log(date, view, navigate)
          }} //date= moment().toDate(), view = Views, navigate = Navigate
          onView={(view)=> console.log(view, this.state.date)} // view = Views
        />
      </div>
    );
  }
}
function MyEvent({ event }) {
  const wrap = useRef(null)
  useEffect(() => {
    if(wrap) {
      // console.log(wrap.current.parentNode.style)
      wrap.current.parentNode.parentNode.style.background = '#F00'
    }
  }, [])
  return (
    <span ref={wrap}>
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  )
}

export default App;
