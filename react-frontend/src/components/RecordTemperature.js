import React, { Component } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import { registerLocale } from "react-datepicker";
// import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
import BodyTemperatureService from "../services/BodyTemperatureService";

ja.options.weekStartsOn = 0;
registerLocale("ja", ja);

class RecordTemperature extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      formInview: false,
      inputStart: new Date(),
      // inputEnd: new Date(),
      id: 0,
      inputTitle: "",
      // inputMemo: "",
      isInputTitle: false,
      isChange: false,
    };

    BodyTemperatureService.getTemperatures().then(res => {
      let tempArray = res.data;

      this.myEvents = tempArray.map((e) => ({ id: e.id, start: e.date, title: e.temperature + ' °C' }));

      this.EVENT_SEL_NON = 0xffff;
      this.selEventID = this.EVENT_SEL_NON;
      this.setState({ formInview: false });
    });

    this.onAddEvent = this.onAddEvent.bind(this);
    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.onDeleteEvent = this.onDeleteEvent.bind(this);
  }
  render() {
    return (
      <div>
        {this.renderCover()}
        {this.renderForm()}
        <div className="container">
          <FullCalendar
            locale="ja" // 日本語
            defaultView="dayGridMonth" // 基本UI
            // contentHeight="auto"
            slotDuration="00:30:00" // 表示する時間軸の最小値
            // minTime="08:00:00"         // 時間の範囲（最小値）
            // maxTime="23:00:00"         // 時間の範囲（最小値）
            selectable={true} // 日付選択可能
            // editable={true} // イベントの編集可能
            // eventOverlap={false}       // イベントの重なり禁止
            allDaySlot={false} // alldayの表示設定
            //allDayText={"日ごと選択"} // alldayに表示する文字レス
            //selectMinDistance={15}                                          // マウスダウン後、選択が許可されるまでのユーザーのマウスの最小移動距離
            // aspectRatio={500.0}
            titleFormat={{
              year: "numeric",
              month: "short",
              day: "numeric",
            }} // タイトルに年月日を表示
            header={{
              left: "prev,next,today",
              center: "title",
              right: ""//dayGridMonth,timeGridWeek",
            }}
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5],
              startTime: "0:00",
              endTime: "24:00",
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.ref}
            weekends={true} // 週末表示
            events={this.myEvents} // 起動時に登録するイベント
            eventClick={this.handleClick} // イベントクリック時
            select={this.handleSelect} // カレンダー範囲選択時
            // eventMouseEnter={this.handleMouseEnt}  // イベント上にマウス
            // eventMouseLeave={this.handleMouseLev}  // イベント上のマウス離れ
            // eventDragStart={this.handleDragStart}  // イベントドラッグ開始時
            // eventDrop={this.handleDrop}            // ドロップ完了時
            // eventResize={this.handleResize}        // イベントサイズ変更完了時
            // dateClick={this.handledateClick}       // 日付クリック時
            // eventRender={this.handleRender}
            selectOverlap={false}
            displayEventTime={false}
          />
        </div>
      </div>
    );
  }
  //--------------
  // カレンダー関連
  //--------------
  handleSelect = (selectInfo) => {
    let start = new Date(selectInfo.start);
    let end = new Date(selectInfo.end);
    start.setHours(start.getHours());
    end.setHours(end.getHours());

    this.setState({ inputTitle: "" });
    this.setState({ inputMemo: "" });
    this.setState({ isInputTitle: false });
    this.setState({ inputStart: start });
    this.setState({ inputEnd: end });
    this.setState({ isChange: false });
    this.setState({ formInview: true });
  };

  handleClick = (info) => {
    const elem = this.myEvents.filter(elem => {
      for (let key in elem) {
        if (elem[key] == info.event.id) {
          return elem;
        }
      }

    });

    let title = elem[0].title;

    if (title.slice(-2) === '°C') {
      title = title.slice(0, -3);
    }

    this.setState({ id: elem[0].id });
    this.setState({ inputTitle: title });
    this.setState({ isInputTitle: true });
    this.setState({ inputStart: new Date(elem[0].start) });
    this.setState({ isChange: true });
    this.setState({ formInview: true });
  };

  //--------------
  // カバー関連
  //--------------
  renderCover() {
    return (
      <div
        onClick={() => {
          this.setState({ formInview: false });
        }}
        className={
          this.state.formInview
            ? "container__cover inview"
            : "container__cover "
        }
      ></div>
    );
  }
  //--------------
  // フォーム関連
  //--------------
  renderForm() {
    return (
      <div
        className={
          this.state.formInview ? "container__form inview" : "container__form"
        }
      >
        <form>
          {this.state.isChange === false ? (
            <div className="container__form__header">体温を入力</div>
          ) : (
              <div className="container__form__header">体温を変更</div>
            )}

          <div>{this.renderTitle()}</div>
          {/* <div>{this.renderStartTime()}</div> */}
          {/* <div>{this.renderEndTime()}</div> */}
          {/* <div>{this.renderMemo()}</div> */}
          <div>{this.renderBtn()}</div>
        </form>
      </div>
    );
  }
  renderTitle() {
    let formattedDate = this.state.inputStart.toLocaleDateString();

    let title = this.state.inputTitle;

    if (title.slice(-2) === '°C') {
      title = title.slice(0, -3);
    }
    return (
      <React.Fragment>
        <p className="container__form__label"> {formattedDate} の体温</p>
        <input
          className="container__form__title"
          type="text"
          value={title}
          onChange={(e) => {
            this.setState({ inputTitle: e.target.value });

            if (e.target.value === "") {
              this.setState({ isInputTitle: false });
            } else {
              this.setState({ isInputTitle: true });
            }
          }}
        />
      </React.Fragment>
    );
  }
  renderBtn() {
    return (
      <div>
        {this.state.isChange === false ? (
          <div>
            <input
              className="container__form__btn_cancel"
              type="button"
              value="キャンセル"
              onClick={() => {
                this.setState({ formInview: false });
              }}
            />
            <input
              className="container__form__btn_save"
              type="button"
              value="保存"
              disabled={!this.state.isInputTitle}
              onClick={this.onAddEvent}
            />
          </div>
        ) : (
            <div>
              <input
                className="container__form__btn_delete"
                type="button"
                value="削除"
                onClick={this.onDeleteEvent}
              />
              <input
                className="container__form__btn_save"
                type="button"
                value="変更"
                onClick={this.onChangeEvent}
              />
            </div>
          )}
      </div>
    );
  }
  //--------------
  // イベント関連
  //--------------
  getdoubleDigestNumer(number) {
    return ("0" + number).slice(-2);
  }
  changeDateToString(dt) {
    const year = dt.getFullYear();
    const month = this.getdoubleDigestNumer(dt.getMonth() + 1);
    const date = this.getdoubleDigestNumer(dt.getDate());
    const hour = this.getdoubleDigestNumer(dt.getHours());
    const minutes = this.getdoubleDigestNumer(dt.getMinutes());

    const retDate = `${year}-${month}-${date} ${hour}:${minutes}:00`;
    return retDate;
  }
  // onInitEvent(values) {
  //   const temperature = {
  //     title: values.title + ' °C',
  //     start: values.start,
  //     id: values.id
  //   };
  //   alert(values.id);
  //   this.myEvents.push(temperature);
  //   this.ref.current.getApi().addEvent(this.myEvents[temperature.id]);
  //   this.setState({ formInview: false });
  // }
  onAddEvent() {
    const starttime = this.changeDateToString(this.state.inputStart);

    let newId;
    this.getMaxId().then(res => {
      newId = res.data.id ? res.data.id + 1 : 1;

      let responseId;
      responseId = BodyTemperatureService.getMaxId();
      const temperature = {
        title: this.state.inputTitle + ' °C',
        start: starttime,
        id: newId
      };

      if (this.addEvent(temperature)) {

        temperature.title = temperature.title.slice(0, -3)
        BodyTemperatureService.createBodyTemperature(temperature);
        this.setState({ formInview: false });
      }
    });
  }
  onChangeEvent(values) {
    // if (window.confirm("変更しますか？")) {
    const starttime = this.changeDateToString(this.state.inputStart);
    // const endtime = this.changeDateToString(this.state.inputEnd);

    // if (starttime >= endtime) {
    //   alert("開始時間と終了時間を確認してください。");
    //   return;
    // }

    const temperature = {
      title: this.state.inputTitle + ' °C',
      // memo: this.state.inputMemo,
      start: starttime,
      // end: endtime,
      id: this.state.id//this.selEventID,
    };

    if (this.changeEvent(temperature) === true) {
      // window.alert("イベントを変更しました。");

      temperature.title = temperature.title.slice(0, -3)
      BodyTemperatureService.updateBodyTemperature(temperature, temperature.id);
      this.setState({ formInview: false });
    }
    // } else {
    //   return;
    // }
  }
  onDeleteEvent(values) {

    BodyTemperatureService.deleteBodyTemperature(this.state.id);
    let delevent = this.ref.current.getApi().getEventById(this.state.id);
    delevent.remove();
    this.selEventID = this.EVENT_SEL_NON;
    // this.myEvents[this.state.id].isDel = true;
    this.setState({ formInview: false });
  }
  addEvent = (ev, col) => {
    this.myEvents.push(ev);
    this.ref.current.getApi().addEvent(ev);
    return true;
  };
  changeEvent = (ev, col = "red") => {
    let updateId = 0;
    for (const key in this.myEvents) {
      if (this.myEvents[key].id == ev.id) {
        updateId = key;
      }
    }

    this.myEvents[updateId].title = ev.title;
    this.myEvents[updateId].start = ev.start;

    this.ref.current.getApi().getEventById(ev.id).remove();
    this.ref.current.getApi().addEvent(this.myEvents[updateId]);

    return true;
  };
  sortEventID = (a, b) => {
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  };
  getMaxId = () => {
    return BodyTemperatureService.getMaxId();
  };
}

export default RecordTemperature;
