import { Box, Container, Typography } from "@mui/material";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const number = {
  fontSize: 15,
  fontFamily: "default",
  color: "info.main",
  fontWeight: "medium",
  textAlign: "left",
};

const content = {
  textAlign: "left",
  fontSize: 15,
};

function TermsOfService() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Box component="section" sx={{ bgcolor: "rgba(255, 255, 255, 0.12)", display: "flex", overflow: "hidden" }}>
          <Container
            sx={{
              my: 5,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="error" variant="h4" component="h4" sx={{ m: 5, fontFamily: "cursive", fontStyle: "italic" }}>
              TermsOfService
            </Typography>
            <Box>
              <Box m={1}>
                <Typography sx={content}>
                  この利用規約（以下、「本規約」といいます。）は、懺悔の館（以下、「当方」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
                </Typography>
              </Box>

              <Box m={1}>
                <Box sx={number}>第1条（適用）</Box>
                <Typography sx={content}>本規約は、ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。 </Typography>
                <Typography sx={content}>
                  当方は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
                </Typography>
                <Typography sx={content}>本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。 </Typography>
              </Box>

              <Box m={1}>
                <Box sx={number}>第2条（利用登録）</Box>
                <Typography sx={content}>
                  本サービスにおいては、登録希望者が本規約に同意の上、当方の定める方法によって利用登録を申請し、当方がこれを承認することによって、利用登録が完了するものとします。
                </Typography>
                <Typography sx={content}>
                  当方は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
                </Typography>
                <Typography sx={content}>1.利用登録の申請に際して虚偽の事項を届け出た場合</Typography>
                <Typography sx={content}>2.本規約に違反したことがある者からの申請である場合</Typography>
                <Typography sx={content}>3.その他、当方が利用登録を相当でないと判断した場合</Typography>
              </Box>

              <Box m={1}>
                <Box sx={number}>第3条（ユーザーIDおよびパスワードの管理）</Box>
                <Typography sx={content}>ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。</Typography>
                <Typography sx={content}>
                  ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。当方は、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
                </Typography>
                <Typography sx={content}>
                  ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、当方に故意又は重大な過失がある場合を除き、当方は一切の責任を負わないものとします。
                </Typography>
              </Box>

              <Box m={1}>
                <Box sx={number}>第4条（禁止事項）</Box>
                <Typography sx={content}>ユーザーは,本サービスの利用にあたり,以下の行為をしてはなりません。</Typography>
                <Typography sx={content}>1.法令または公序良俗に違反する行為</Typography>
                <Typography sx={content}>2.犯罪行為に関連する行為</Typography>
                <Typography sx={content}>3.本サービスの内容等,本サービスに含まれる著作権,商標権ほか知的財産権を侵害する行為</Typography>
                <Typography sx={content}>4.当方,ほかのユーザー,またはその他第三者のサーバーまたはネットワークの機能を破壊したり,妨害したりする行為</Typography>
                <Typography sx={content}>5.本サービスによって得られた情報を商業的に利用する行為</Typography>
                <Typography sx={content}>6.当方のサービスの運営を妨害するおそれのある行為</Typography>
                <Typography sx={content}>7.不正アクセスをし,またはこれを試みる行為</Typography>
                <Typography sx={content}>8.他のユーザーに関する個人情報等を収集または蓄積する行為</Typography>
                <Typography sx={content}>9.不正な目的を持って本サービスを利用する行為</Typography>
                <Typography sx={content}>10.本サービスの他のユーザーまたはその他の第三者に不利益,損害,不快感を与える行為</Typography>
                <Typography sx={content}>11.他のユーザーに成りすます行為</Typography>
                <Typography sx={content}>12.当方が許諾しない本サービス上での宣伝、広告、勧誘、または営業行為</Typography>
                <Typography sx={content}>13.面識のない異性との出会いを目的とした行為</Typography>
                <Typography sx={content}>14.当方のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</Typography>
                <Typography sx={content}>15.その他、当方が不適切と判断する行為</Typography>
              </Box>

              <Box m={1}>
                <Box sx={number}>第5条（本サービスの提供の停止）</Box>
                <Typography sx={content}>
                  当方は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                </Typography>
                <Typography sx={content}>1.本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</Typography>
                <Typography sx={content}>2.地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</Typography>
                <Typography sx={content}>3.コンピュータまたは通信回線等が事故により停止した場合</Typography>
                <Typography sx={content}>当方は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。</Typography>
              </Box>

              <Box m={1}>
                <Box sx={number}>第6条（利用制限および登録抹消）</Box>
                <Typography sx={content}>
                  当方は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
                </Typography>
                <Typography sx={content}>1.本規約のいずれかの条項に違反した場合</Typography>
                <Typography sx={content}>2.登録事項に虚偽の事実があることが判明した場合</Typography>
                <Typography sx={content}>3.料金等の支払債務の不履行があった場合</Typography>
                <Typography sx={content}>4.当方からの連絡に対し、一定期間返答がない場合</Typography>
                <Typography sx={content}>5.その他、当方が本サービスの利用を適当でないと判断した場合</Typography>
                <Typography sx={content}> 当方は、本条に基づき当方が行った行為によりユーザーに生じた損害について、一切の責任を負いません。</Typography>
              </Box>
              <Box m={1}>
                <Box sx={number}> 第7条（保証の否認および免責事項）</Box>
                <Typography sx={content}>
                  当方は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
                </Typography>
                <Typography sx={content}>
                  当方は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関する当方とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
                </Typography>
                <Typography sx={content}>
                  前項ただし書に定める場合であっても、当方は、当方の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当方またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。また、当方の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は、ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
                </Typography>
                <Typography sx={content}>当方は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。</Typography>
              </Box>

              <Box m={1}>
                <Box sx={number}>第8条（サービス内容の変更等）</Box>
                <Typography sx={content}>
                  当方は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
                </Typography>
              </Box>

              <Box m={1}>
                <Box sx={number}>第9条（利用規約の変更）</Box>
                <Typography sx={content}>
                  当方は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
                </Typography>
              </Box>

              <Box m={1}>
                <Box sx={number}> 第10条（個人情報の取扱い）</Box>
                <Typography sx={content}>当方は、本サービスの利用によって取得する個人情報については、当方「プライバシーポリシー」に従い適切に取り扱うものとします。</Typography>
              </Box>

              <Box m={1}>
                <Box sx={number}> 第11条（権利義務の譲渡の禁止）</Box>
                <Typography sx={content}>
                  ユーザーは、当方の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
                </Typography>
              </Box>

              <Box m={1}>
                <Box sx={number}> 第12条（準拠法・裁判管轄）</Box>
                <Typography sx={content}>規約の解釈にあたっては、日本法を準拠法とします。</Typography>
                <Typography sx={content}>本サービスに関して紛争が生じた場合には、当方の本店所在地を管轄する裁判所を専属的合意管轄とします。</Typography>
              </Box>
            </Box>
          </Container>
        </Box>
        <Box component="footer" sx={{ mt: "auto", width: "100%" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
export default TermsOfService;
