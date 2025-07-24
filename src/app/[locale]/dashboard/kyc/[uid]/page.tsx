"use client";
import React from "react";
import {
  Button,
  Col,
  Descriptions,
  DescriptionsProps,
  Form,
  Input,
  Row,
  Space,
  Tag,
  theme,
  Image,
  Spin,
  Skeleton,
  Divider,
  message,
  Alert,
  Tooltip, Card, Checkbox,
} from "antd";
import LayoutDashboard from "@/components/Layouts/Dashboard";
import { API_URL } from "@/config/config";
import Link from "next/link";
import { withLocalePath } from "@/utils/locale";
import { usePathname, useRouter } from "next/navigation";
import {
  AlertTwoTone,
  CheckOutlined,
  CloseOutlined,
  LeftOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import {Case, Switch, If, Then, Default} from "react-if";
import { FormatDateTime } from "@/utils/date";
import Meta from "antd/es/card/Meta";
import AddAdminLog from "@/components/AdminLogCompenent";

const ApprovePage = ({ params }: { params: { uid: string } }) => {
  const [adminLevel, setAdminLevel] = React.useState<number>(0);
  const router = useRouter();

  const fullPath = usePathname();
  const [form] = Form.useForm();

  const [ktpExist, setKtpExist] = React.useState(false);
  const [bypass, setBypass] = React.useState(false);
  const [loadingPage, setLoadingPage] = React.useState(false);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);

  const [detail, setDetail] = React.useState<any>({});

  const getData = async () => {
    setLoadingPage(true);
    const res = await fetch(`${API_URL}/kyc/basic/${params.uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setDetail(data);
    setKtpExist(data?.ktp_exist);
    form.setFieldsValue(data);
    setLoadingPage(false);
  };

  const onApprove = async () => {
    try {
      setLoadingSubmit(true);
      await form.validateFields();
      const values = form.getFieldsValue();

      const formData = new FormData();

      for (var key of Object.keys(values)) {
        if (values[key] === undefined) {
          continue;
        }
        formData.append(key, values[key]);
      }

      const res = await fetch(`${API_URL}/kyc/basic/${params.uid}/approve`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      let metadata: any = {};
      metadata.member_uid = detail.member_uid;
      metadata.before = detail;
      metadata.after = values;
      delete metadata.after.upload;

      await AddAdminLog("kyc_approve", {
        "member_uid": detail.member_uid,
        "identity_card": detail.identity_card,
        "date_of_birth": detail.date_of_birth,
        "full_name": detail.full_name,
        "phone_number": `62${detail?.phone_number}`,
        "email": detail.member_email,
        "npwp_card": detail.npwp_card,
        "occupation": detail.occupation,
        "average_yearly_income": detail.average_yearly_income,
        "source_of_fund": detail.source_of_fund,
        "purpose_of_account_opening": detail.purpose_of_account_opening,
        "mother_name": detail.mother_name,
        "domisili": detail.domisili
      }, null)

      setLoadingSubmit(false);
      message.success("Approve Success");
      router.push(withLocalePath(fullPath, "/dashboard/kyc"));
    } catch (e) {
      console.log(e);
      setLoadingSubmit(false);
    }
  };

  const onVerify = async () => {
    try {
      setLoadingSubmit(true);
      await form.validateFields();
      const values = form.getFieldsValue();

      const formData = new FormData();
      formData.append("identity_card", values.identity_card);
      formData.append("date_of_birth", values.date_of_birth);
      formData.append("full_name", values.full_name);
      formData.append("phone_number", `62${detail?.phone_number}`);
      formData.append("email", detail.member_email);
      formData.append("npwp_card", values.npwp_card);
      formData.append("occupation", values.occupation);
      formData.append("average_yearly_income", values.average_yearly_income);
      formData.append("source_of_fund", values.source_of_fund);
      formData.append("purpose_of_account_opening", values.purpose_of_account_opening);
      formData.append("mother_name", values.mother_name);
      formData.append("domisili", values.domisili);

      const res = await fetch(`${API_URL}/kyc/basic/${params.uid}/verify`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      let metadata: any = {};
      metadata.member_uid = detail.member_uid;
      metadata.before = detail;
      metadata.after = values;
      delete metadata.after.upload;

      await getData();

      setLoadingSubmit(false);

      await AddAdminLog("kyc_verify", {
        "member_uid": detail.member_uid,
        "identity_card": detail.identity_card,
        "date_of_birth": detail.date_of_birth,
        "full_name": detail.full_name,
        "phone_number": `62${detail?.phone_number}`,
        "email": detail.member_email,
        "npwp_card": detail.npwp_card,
        "occupation": detail.occupation,
        "average_yearly_income": detail.average_yearly_income,
        "source_of_fund": detail.source_of_fund,
        "purpose_of_account_opening": detail.purpose_of_account_opening,
        "mother_name": detail.mother_name,
        "domisili": detail.domisili
      }, {
        "member_uid": detail.member_uid,
        "identity_card": values.identity_card,
        "date_of_birth": values.date_of_birth,
        "full_name": values.full_name,
        "phone_number": `62${detail?.phone_number}`,
        "email": detail.member_email,
        "npwp_card": values.npwp_card,
        "occupation": values.occupation,
        "average_yearly_income": values.average_yearly_income,
        "source_of_fund": values.source_of_fund,
        "purpose_of_account_opening": values.purpose_of_account_opening,
        "mother_name": values.mother_name,
        "domisili": values.domisili
      })

      message.success("Verify Success");
    } catch (e) {
      console.log(e);
      setLoadingSubmit(false);
    }
  };

  const onReject = async () => {
    try {
      setLoadingSubmit(true);
      const res = await fetch(`${API_URL}/kyc/basic/${params.uid}/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: form.getFieldValue("reason"),
        }),
      });
      const data = await res.json();

      await AddAdminLog("kyc_reject", null, null)

      setLoadingSubmit(false);
      message.success("Reject Success");
      router.push(withLocalePath(fullPath, "/dashboard/kyc"));
    } catch (e) {
      setLoadingSubmit(false);
    }
  };

  React.useEffect(() => {
    getData();

    const member = localStorage.getItem("admin");
    if (member) {
      const memberJson = JSON.parse(member);
      setAdminLevel(memberJson?.level);
    }
  }, []);

  const NameTip = () => (
      <Tooltip title="The name will change to follow the identity name">
      <span
          role="img"
          aria-label="question-circle"
          title=""
          className="anticon anticon-question-circle ant-form-item-tooltip"
      >
        <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="question-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
        >
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
          <path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path>
        </svg>
      </span>
      </Tooltip>
  );

  const items: DescriptionsProps["items"] = [
    {
      key: "0",
      label: "UID",
      children: detail.member_uid,
    },
    {
      key: "1",
      label: (
          <p>
            Full Name <NameTip />{" "}
          </p>
      ),
      children: detail.member_full_name,
    },
    {
      key: "2",
      label: "Email",
      children: detail.member_email,
    },
    {
      key: "3",
      label: "Status",
      children:
          detail.member_status === 'inactive' ? (
              <Tag color="geekblue">Inactive</Tag>
          ) : detail.member_status === 'active' || detail.member_status === 2 ? (
              <Tag color="green">Active</Tag>
          ) : detail.member_status === 'banned' ? (
              <Tag color="red">Banned</Tag>
          ) : (
              <Tag color="geekblue">Unknown</Tag>
          ),
    },
    {
      key: "5",
      label: "Risk",
      children: detail.member_risk ? (
          <Space>
            <AlertTwoTone style={{ fontSize: 16 }} twoToneColor="#eb2f96" />
            {detail.member_risk_note}
          </Space>
      ) : (
          <Space>
            <NotificationOutlined style={{ fontSize: 16 }} />
            Not Risk
          </Space>
      ),
    },
    {
      key: "6",
      label: "Join At",
      children: FormatDateTime(detail.member_created_at),
    },
    {
      key: "7",
      label: "Phone Number",
      children: `62${detail?.phone_number}`,
    },
  ];

  const { token } = theme.useToken();

  return (
      <LayoutDashboard
          title="Basic KYC"
          subTitle="Member Detail"
          adminLevel={adminLevel}
      >
        <Descriptions items={items} />
        <Divider />
        <Row>
          <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
          >
            <If condition={loadingPage}>
              <Then>
                <Skeleton.Image
                    style={{ height: 150, width: 250 }}
                    active={true}
                />
              </Then>
            </If>
            <If condition={!loadingPage}>
              <Then>
                <Card
                    cover={<Image
                        width={250}
                        src={detail?.image_selfie}
                        fallback="data:image/png;base64,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"
                    />}
                >
                  <Meta style={{textAlign: "center"}} title="Selfie" />
                </Card>
              </Then>
            </If>
          </Col>
          <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
          >
            <If condition={loadingPage}>
              <Then>
                <Skeleton.Image
                    style={{ height: 150, width: 250 }}
                    active={true}
                />
              </Then>
            </If>
            <If condition={!loadingPage}>
              <Then>
                <Card
                    cover={<Image
                        width={250}
                        src={detail?.image_liveness}
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                    />}
                >
                  <Meta style={{textAlign: "center"}} title="Liveness" />
                </Card>
              </Then>
            </If>
          </Col>
          <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
          >
            <If condition={loadingPage}>
              <Then>
                <Skeleton.Image
                    style={{ height: 150, width: 250 }}
                    active={true}
                />
              </Then>
            </If>
            <If condition={!loadingPage}>
              <Then>
                <Card
                    cover={<Image
                        width={250}
                        src={detail?.image_ktp}
                        fallback="data:image/png;base64,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"
                    />}
                >
                  <Meta style={{textAlign: "center"}} title="KTP" />
                </Card>
              </Then>
            </If>
          </Col>
          <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
          >
            <If condition={loadingPage}>
              <Then>
                <Skeleton.Image
                    style={{ height: 150, width: 250 }}
                    active={true}
                />
              </Then>
            </If>
            <If condition={!loadingPage}>
              <Then>
                <Card
                    cover={<Image
                        width={250}
                        src={detail?.image_npwp}
                        fallback="data:image/png;base64,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"
                    />}
                >
                  <Meta style={{textAlign: "center"}} title="NPWP" />
                </Card>

              </Then>
            </If>
          </Col>
        </Row>
        <Divider />
        <Form
            form={form}
            name="advanced_search"
            style={{
              maxWidth: "none",
              background: token.colorFillAlter,
              borderRadius: token.borderRadiusLG,
              padding: 24,
            }}
            disabled={detail?.dukcapil_status === 1}
        >
          <Row gutter={24}>
            <Col span={8}>
              <If condition={loadingPage}>
                <Then>
                  <Form.Item name="full_name" label="Full Name" rules={[]}>
                    <Skeleton.Input active={true} block={true}/>
                  </Form.Item>
                </Then>
              </If>
              <If condition={!loadingPage}>
                <Then>
                  <Form.Item name="full_name" label="Full Name" rules={[]}>
                    <Input placeholder="placeholder"/>
                  </Form.Item>
                </Then>
              </If>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="identity_card"
                  label="Identity Card"
                  rules={[
                    {
                      message: "Input something!",
                    },
                  ]}

                  validateStatus={ktpExist ? "error" : ""}
                  hasFeedback={ktpExist}
                  help={ktpExist ? "NIK already exist" : ""}
              >
                <Input placeholder="placeholder" onChange={(a) => {
                  if(a.target.value === detail?.identity_card){
                    setKtpExist(true)
                  }else{
                    setKtpExist(false)
                  }
                }}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="npwp_card"
                  label="NPWP Card"
                  rules={[
                    {
                      message: "Input something!",
                    },
                  ]}
              >
                <Input placeholder="placeholder"/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                  name="date_of_birth"
                  label="Date of Birth"
                  rules={[
                    {
                      message: "Input something!",
                    },
                  ]}
              >
                <Input placeholder="placeholder"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="occupation"
                  label="Occupation"
                  rules={[
                    {
                      message: "Input something!",
                    },
                  ]}
              >
                <Input placeholder="placeholder"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="average_yearly_income"
                  label="Average Yearly Income"
                  rules={[
                    {
                      message: "Input something!",
                    },
                  ]}
              >
                <Input placeholder="placeholder"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="source_of_fund"
                  label="Source Of Fund"
                  rules={[
                    {
                      message: "Input something!",
                    },
                  ]}
              >
                <Input placeholder="placeholder"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="purpose_of_account_opening"
                  label="Purpose Of Account Opening"
                  rules={[
                    {
                      message: "Input something!",
                    },
                  ]}
              >
                <Input placeholder="placeholder"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="mother_name"
                  label="Mother Name"
                  rules={[
                    {
                      message: "Input something!",
                    },
                  ]}
              >
                <Input placeholder="placeholder"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  name="domisili"
                  label="Domisili"
                  rules={[
                    {
                      message: "Input something!",
                    },
                  ]}
              >
                <Input placeholder="placeholder"/>
              </Form.Item>
            </Col>
          </Row>
          <Divider/>
          <Row gutter={24}>
            <Col span={18}>
              <Switch>
                <Case condition={detail?.image_compare == ""}>
                  <Alert message="Similarity Status: Pending" type="warning"/>
                </Case>
                <Default>
                  <Alert message={`Similarity Status: ${detail?.image_compare}`} type="info"/>
                </Default>
              </Switch>
              <br/>
              <Switch>
                <Case condition={detail?.dukcapil_status == 0}>
                  <Alert message="Dukcapil Check: Pending" type="warning"/>
                </Case>
                <Case condition={detail?.dukcapil_status == 1}>
                  <Alert message="Dukcapil Check: Success" type="success"/>
                </Case>
                <Default>
                  <Alert message={(<p><b>Rejected :  </b>{detail?.dukcapil_description}</p>)} type="error"/>
                </Default>
              </Switch>
            </Col>
            <Col span={6} style={{justifyContent: "center", display: "flex", alignItems: "center"}}>
              <Button
                  type="primary"
                  icon={loadingSubmit ? <Spin size="small"/> : <CloseOutlined/>}
                  block={true}
                  onClick={onVerify}
                  disabled={(detail?.dukcapil_status === 1 || ktpExist || loadingSubmit || bypass) && detail?.image_compare !== "true | Passed"}
              >
                Verify
              </Button>
            </Col>
          </Row>
          <Divider/>
          <div style={{textAlign: "right"}}>
            <Form.Item
                name="reason"
                label="Reason"
                rules={[
                  {
                    message: "Input something!",
                  },
                ]}
            >
              <Input placeholder="reason!" disabled={false}/>
            </Form.Item>
            <Checkbox onChange={(e) => setBypass(e.target.checked)} checked={bypass} disabled={detail?.dukcapil_status === 1}>Whitelist</Checkbox>
            <br/>
            <br/>
            <Space size="small">
              <Link
                  href={withLocalePath(fullPath, "/dashboard/member/kyc/basic")}
              >
                <Button
                    icon={loadingSubmit ? <Spin size="small"/> : <LeftOutlined/>}
                    disabled={loadingSubmit}
                >
                  Cancel
                </Button>
              </Link>
              <Button
                  type="primary"
                  icon={loadingSubmit ? <Spin size="small"/> : <CheckOutlined/>}
                  disabled={loadingSubmit || (detail?.dukcapil_status != 1 && !bypass)}
                  onClick={onApprove}
              >
                Approve
              </Button>
              <Button
                  type="primary"
                  icon={loadingSubmit ? <Spin size="small"/> : <CloseOutlined/>}
                  disabled={loadingSubmit}
                  onClick={onReject}
              >
                Reject
              </Button>
            </Space>
          </div>
        </Form>
      </LayoutDashboard>
  );
};

export default ApprovePage;