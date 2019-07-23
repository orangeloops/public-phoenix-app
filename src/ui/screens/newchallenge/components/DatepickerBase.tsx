import {BaseComponent, BaseComponentProps, BaseComponentState} from "../../../BaseComponent";
import {DatePickerAndroid, Platform} from "react-native";

export interface DatepickerProps extends BaseComponentProps {
  onRequestClose: () => void;
  onChange: (date: Date) => void;
  value: Date;
  maxDate?: Date | undefined;
  minDate?: Date | undefined;
}

export interface DatepickerState extends BaseComponentState {
  editingDate: Date;
}

export abstract class DatepickerBase extends BaseComponent<DatepickerProps, DatepickerState> {
  constructor(props: DatepickerProps) {
    super(props);

    this.state = {
      editingDate: props.value,
    };
  }

  protected onRequestClose = () => {
    this.props.onRequestClose();
  };

  public componentDidMount() {
    if (Platform.OS === "android") this.openDatePicker();
  }

  protected handleDateChange = (editingDate: Date) => {
    this.setState({editingDate});
  };

  protected onAccept = () => {
    this.props.onChange(this.state.editingDate);
    this.onRequestClose();
  };

  protected async openDatePicker() {
    const {value, maxDate, minDate} = this.props;

    try {
      const result = await DatePickerAndroid.open({
        minDate,
        maxDate,
        date: value,
      });
      if (result.action !== DatePickerAndroid.dismissedAction) {
        const {year, month, day} = result;

        this.handleDateChange(new Date(year!, month!, day));
        this.onAccept();
      }
      this.onRequestClose();
    } catch ({code, message}) {
      console.warn("Cannot open ideasDeadline picker", message);
    }
  }
}
