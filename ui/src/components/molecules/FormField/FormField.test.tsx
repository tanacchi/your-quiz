import { render, screen } from "@testing-library/react";
import { useId } from "react";
import { FormField } from "./FormField";

function TestFormField({
  label,
  optional,
}: {
  label: string;
  optional?: boolean;
}) {
  const id = useId();
  const optionalProp = optional === true ? { optional: true as const } : {};
  return (
    <FormField label={label} htmlFor={id} {...optionalProp}>
      <input id={id} />
    </FormField>
  );
}

describe("FormField", () => {
  it("ラベルを描画する", () => {
    render(<TestFormField label="問題文" />);
    expect(screen.getByText("問題文")).toBeInTheDocument();
  });

  it("label が input に紐付く", () => {
    render(<TestFormField label="タグ" />);
    expect(screen.getByLabelText("タグ")).toBeInTheDocument();
  });

  it("optional=true のとき「(任意)」を表示する", () => {
    render(<TestFormField label="解説" optional />);
    expect(screen.getByText("(任意)")).toBeInTheDocument();
  });
});
