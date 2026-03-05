import { Container, Grid } from "@mui/material"
import type React from "react"
import type { ChangeEvent } from "react"

import {
  CardComponent,
  CustomTable,
  Header,
  FormComponent,
  StyledH2,
} from "@/components"

import {
  useFormValidation,
  useGet,
  useDelete,
  usePost,
} from "@/hooks"

import type { InputProps } from "@/types"
import type { LeadsData, LeadsPostData } from "@/types"

function Leads() {
  // =============================
  // INPUTS
  // =============================
  const inputs: InputProps[] = [
    { name: "name", type: "text", placeholder: "Nome", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
    { name: "phone", type: "tel", placeholder: "Telefone", required: true },
  ]

  const {
    formValues,
    formValid,
    handleChange,
    resetForm,
  } = useFormValidation(inputs)

  // =============================
  // GET LEADS
  // =============================
  const [
    leadsData,
    leadsLoading,
    leadsError,
    getLeads,
  ] = useGet<LeadsData[]>("leads")

  // =============================
  // CREATE LEAD
  // =============================
  const [
    ,
    createLoading,
    ,
    createLead,
  ] = usePost<LeadsData, LeadsPostData>(
    "leads/create",
    true
  )

  // =============================
  // DELETE LEAD
  // =============================
  const [, , , deleteLead] = useDelete("leads")

  // =============================
  // SUBMIT
  // =============================
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!formValid) return

    const result = await createLead({
      name: formValues[0],
      email: formValues[1],
      phone: formValues[2],
    })

    if (result) {
      await getLeads()
      resetForm()
    }
  }

  // =============================
  // DELETE
  // =============================
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este lead?"
    )

    if (!confirmDelete) return

    await deleteLead(id)
    await getLeads()
  }

  return (
    <>
      <Header />

      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          {/* ================= TABELA ================= */}
          <Grid item xs={12} sm={7}>
            <CardComponent>
              <StyledH2 className="mb-1">
                Meus Leads
              </StyledH2>

              {leadsLoading ? (
                <p>Carregando...</p>
              ) : leadsError ? (
                <p>Erro ao carregar leads</p>
              ) : (
                <CustomTable
                  headers={["Nome", "Email", "Telefone", ""]}
                  rows={
                    leadsData && leadsData.length > 0
                      ? leadsData.map((lead) => [
                          lead.name,
                          lead.email,
                          lead.phone,
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              color: "red",
                              cursor: "pointer",
                              fontWeight: 600,
                            }}
                            onClick={() =>
                              handleDelete(lead.id)
                            }
                          >
                            Excluir
                          </button>,
                        ])
                      : [["Nenhum lead", "", "", ""]]
                  }
                />
              )}
            </CardComponent>
          </Grid>

          {/* ================= FORM ================= */}
          <Grid item xs={12} sm={5}>
            <CardComponent>
              <StyledH2 className="mb-1">
                Cadastrar Lead
              </StyledH2>

              <FormComponent
                onSubmit={handleSubmit}
                inputs={inputs.map((input, index) => ({
                  ...input,
                  value: formValues[index] || "",
                  onChange: (
                    e: ChangeEvent<HTMLInputElement>
                  ) =>
                    handleChange(
                      index,
                      e.target.value
                    ),
                }))}
                buttons={[
                  {
                    type: "submit",
                    className: "primary",
                    disabled:
                      !formValid || createLoading,
                    children: createLoading
                      ? "Cadastrando..."
                      : "Cadastrar Lead",
                  },
                ]}
              />
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Leads