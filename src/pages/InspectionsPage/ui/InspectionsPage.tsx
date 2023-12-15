import { InspectionsInfiniteList } from "@/features/Inspections/inspectionsInfiniteList";
import { Flex } from "antd";
import { memo } from "react";

export interface InspectionsPageProps {
    className?: string;
}

const InspectionsPage = (props: InspectionsPageProps) => {
    const { className } = props;

    return (
        <Flex vertical gap={8}>
            <InspectionsInfiniteList />;
        </Flex>
    );
};

export default memo(InspectionsPage);
