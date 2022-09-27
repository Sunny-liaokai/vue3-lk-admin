import {
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Menu,
  Modal,
  Radio,
  Row,
  Select,
  Table,
  Button,
} from "ant-design-vue";
import type { App } from "vue";

// import 'ant-design-vue/dist/antd.css';
import "ant-design-vue/dist/antd.variable.min.css";
import "dayjs/locale/zh-cn";

export function setupAntd(app: App<Element>) {
  app
    .use(Form)
    .use(Input)
    .use(Modal)
    .use(Table)
    .use(Menu)
    .use(Card)
    .use(Checkbox)
    .use(Radio)
    .use(Col)
    .use(Row)
    .use(Select)
    .use(Button)
    .use(DatePicker);
}
