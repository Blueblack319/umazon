import Link from 'next/link';
import { Input, Layout, Select, Button } from 'antd';
import { DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

const { Header, Content } = Layout;
const { Option } = Select;

interface CustomLayoutProps {
  children: React.ReactNode;
}

const selectBefore = (
  <Select defaultValue="all">
    <Option value="all">all</Option>
    <Option value="books">Books</Option>
    <Option value="books">Books</Option>
    <Option value="books">Books</Option>
    <Option value="books">Books</Option>
    <Option value="books">Books</Option>
    <Option value="books">Books</Option>
    <Option value="books">Books</Option>
    <Option value="books">Books</Option>
    <Option value="books">Books</Option>
  </Select>
);

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => (
  <Layout className={styles.customLayout}>
    <Header>
      <div className={styles.header}>
        <Button className={styles.button}>
          <Link href="/">
            <a>
              <img
                src="https://s3.india.com/wp-content/uploads/2016/03/amazon1.jpg"
                alt="logo"
                width="130px"
                height="53px"
              />
            </a>
          </Link>
        </Button>

        <Input addonBefore={selectBefore} className={styles.searchBar} />

        <Button className={styles.button}>
          <Link href="/signin">
            <a>
              Hello, Sign in <br /> <strong>Account & Links</strong>
              <DownOutlined />
            </a>
          </Link>
        </Button>
        <Button className={styles.button}>
          <Link href="/signin">
            <a>
              Returns <br />
              <strong>Orders</strong>
              <DownOutlined />
            </a>
          </Link>
        </Button>

        <Button className={styles.cart}>
          <Link href="/signin">
            <a>
              <ShoppingCartOutlined /> 0
            </a>
          </Link>
        </Button>
        <div>Cart</div>
      </div>
    </Header>
    <Content className={styles.content}>{children}</Content>
  </Layout>
);

export default CustomLayout;
