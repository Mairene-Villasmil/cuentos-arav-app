type Props = {
  collections: string[];
  ageRanges: string[];
  current: { collection?: string; ageRange?: string; type?: string };
  action: string;
};

export function CatalogFilters({ collections, ageRanges, current, action }: Props) {
  return (
    <form
      action={action}
      className="flex flex-wrap items-center gap-3 rounded-3xl border border-border/70 bg-card p-4 shadow-sm"
    >
      <select
        name="coleccion"
        defaultValue={current.collection ?? ""}
        className="rounded-xl border border-border bg-background px-3 py-2 text-sm"
      >
        <option value="">Todas las colecciones</option>
        {collections.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        name="edad"
        defaultValue={current.ageRange ?? ""}
        className="rounded-xl border border-border bg-background px-3 py-2 text-sm"
      >
        <option value="">Todas las edades</option>
        {ageRanges.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      <select
        name="tipo"
        defaultValue={current.type ?? ""}
        className="rounded-xl border border-border bg-background px-3 py-2 text-sm"
      >
        <option value="">Estándar y personalizados</option>
        <option value="standard">Solo estándar</option>
        <option value="custom">Solo personalizables</option>
      </select>

      <button
        type="submit"
        className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Filtrar
      </button>
    </form>
  );
}
