import { useRequest } from 'ahooks';
import { Form, Select } from 'antd';
import { useState } from 'react';
import AcademyService from 'services/academies';
import UniversityService from 'services/universities';

export default function OrganizationFormItems() {
  const [university, setUniversity] = useState<
    { value: string; label: string }[]
  >([]);
  const [academy, setAcademy] = useState<{ value: string; label: string }[]>(
    []
  );
  const { loading: universityLoading } = useRequest(UniversityService.get, {
    onSuccess: async (response) => {
      if (response.status === 200) {
        const data: Array<{ id: string; name: string }> = await response.json();
        const u = data.map((d) => ({
          value: d.id,
          label: d.name,
        }));
        setUniversity(u);
      }
    },
  });
  const { loading: academyLoading } = useRequest(AcademyService.get, {
    onSuccess: async (response) => {
      if (response.status === 200) {
        const data: Array<{ id: string; name: string }> = await response.json();
        const a = data.map((d) => ({
          value: d.id,
          label: d.name,
        }));
        setAcademy(a);
      }
    },
  });

  return (
    <>
      <Form.Item
        name="universityId"
        rules={[{ required: true, message: '请选择学校' }]}
      >
        <Select
          showSearch
          placeholder="学校"
          options={university}
          optionFilterProp="label"
          loading={universityLoading}
        />
      </Form.Item>
      <Form.Item
        name="academyId"
        rules={[{ required: true, message: '请选择学院' }]}
      >
        <Select
          showSearch
          placeholder="学院"
          options={academy}
          optionFilterProp="label"
          loading={academyLoading}
        />
      </Form.Item>
    </>
  );
}
