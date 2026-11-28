import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from "../../assets/logo.png";
import bg from "../../assets/bg_pdf.jpg";
import { PROVIDER_INFO } from '../../core/constants/providerInfo';

export function ProposalPdf() {
    return (
        <Document>
             <Page size="A4" style={style.page}>
                <View style={style.header}>
                    <Image
                        src={logo}
                        style={{height: "27mm", width: "35mm"}}
                    />

                    <View>
                        <Text>{PROVIDER_INFO.company.name}</Text>
                        
                    </View>

                    <View>
                        <Text>PROPOSTA COMERCIAL</Text>
                    </View>
                </View>
             </Page>
        </Document>
    );
}

const MARGIN = "12mm";

const COLORS = {
    bg: "#ffffff",
    bgStrong: "#000000" ,
    bgMuted: "#f5f5f0",
    bgStripe: "#fafaf5",
    colorBrand: "#FFD700",
    inkOnDark: "#ffffff",
    inkOnBody: "#000000",
    inkMuted: "#6e6e69",
    line: "#d9d9d1"
} as const;

const style = StyleSheet.create({
    page: {
        backgroundColor: COLORS.bg,
    },
    header: {
        backgroundColor: COLORS.bgStrong,
        color: COLORS.inkOnDark,
        paddingHorizontal: MARGIN,
        flexDirection: "row",
        paddingVertical: "3mm",
        gap: "5mm"
    }
});