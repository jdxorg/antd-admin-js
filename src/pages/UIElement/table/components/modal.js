import {ModalForm} from '@/components/antd-design/Form';

export default class Modal extends ModalForm {
  getTitle = () => '模态框式表单2';

  getDataSource = () => [
    { label: 'key1', name: 'name1', required: true },
    { label: 'key2', name: 'name2', required: true },
    { label: 'key3', name: 'name3' },
  ];
}
