import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Styles from "./Category.module.css";

/* ── Icons ── */
const Icon = ({ d, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  plus:   "M12 5v14M5 12h14",
  edit:   "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7|M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:  "M3 6h18|M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6|M10 11v6M14 11v6|M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2",
  check:  "M20 6L9 17l-5-5",
  x:      "M18 6L6 18M6 6l12 12",
  search: "M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z",
  tag:    "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z|M7 7h.01",
  list:   "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
};

const MultiIcon = ({ paths, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    {paths.split("|").map((p, i) => <path key={i} d={p} />)}
  </svg>
);

const Category = () => {
  const [category, setCategory]     = useState("");
  const [categorys, setCategorys]   = useState([]);
  const [editId, setEditId]         = useState(null);
  const [showForm, setShowForm]     = useState(false);
  const [loading, setLoading]       = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast]           = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch]         = useState("");

  useEffect(() => { loadCategory(); }, []);

  const filtered = useMemo(() =>
    categorys.filter(c =>
      c.category_name.toLowerCase().includes(search.toLowerCase())
    ), [categorys, search]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const loadCategory = () => {
    setLoading(true);
    axios.get("http://127.0.0.1:8000/category/")
      .then(res => setCategorys(res.data.categorydata))
      .catch(() => setCategorys([]))
      .finally(() => setLoading(false));
  };

  const openAdd = () => {
    setEditId(null);
    setCategory("");
    setShowForm(true);
    setDeleteConfirm(null);
  };

  const openEdit = (row) => {
    setEditId(row.id);
    setCategory(row.category_name);
    setShowForm(true);
    setDeleteConfirm(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setCategory("");
    setEditId(null);
  };

  const handleSubmit = () => {
    if (!category.trim() || submitting) return;
    setSubmitting(true);
    const data = { category_name: category };
    const req  = editId
      ? axios.put(`http://127.0.0.1:8000/editcategory/${editId}/`, data)
      : axios.post("http://127.0.0.1:8000/category/", data);
    req.then(() => {
      closeForm();
      loadCategory();
      showToast(editId ? "Category updated successfully" : "Category added successfully");
    }).finally(() => setSubmitting(false));
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/deletecategory/${id}/`).then(() => {
      loadCategory();
      setDeleteConfirm(null);
      showToast("Category removed", "error");
    });
  };

  const isEditing = editId !== null;

  return (
    <div className={Styles.page}>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`${Styles.toast} ${toast.type === "error" ? Styles.toastRed : Styles.toastGreen}`}
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0,   x: "-50%" }}
            exit={{   opacity: 0, y: -14,  x: "-50%" }}
            transition={{ duration: 0.28, ease: [0.22,1,0.36,1] }}
          >
            <span className={Styles.toastDot} />
            {toast.msg}
            <motion.div
              className={Styles.toastBar}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3.2, ease: "linear" }}
              style={{ originX: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════
          TOP STATS BAR
      ══════════════════════════════════ */}
      <motion.div
        className={Styles.statsBar}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
      >
        {[
          { label: "Total Categories", value: categorys.length, color: "#00c8f0", glow: "rgba(0,200,240,0.15)" },
          { label: "Visible",          value: filtered.length,   color: "#00e5a0", glow: "rgba(0,229,160,0.15)" },
          { label: "Hidden by Search", value: categorys.length - filtered.length, color: "#ffb800", glow: "rgba(255,184,0,0.12)" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className={Styles.statCard}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.38, ease: [0.22,1,0.36,1] }}
            style={{ "--glow": s.glow }}
          >
            <span className={Styles.statVal} style={{ color: s.color }}>{s.value}</span>
            <span className={Styles.statLabel}>{s.label}</span>
          </motion.div>
        ))}

        {/* Market chip */}
        <div className={Styles.marketChip}>
          <span className={Styles.marketDot} />
          <span>NYSE OPEN</span>
        </div>
      </motion.div>

      {/* ══════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════ */}
      <motion.div
        className={Styles.header}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.08 }}
      >
        {/* Left */}
        <div className={Styles.headerLeft}>
          <div className={Styles.headerIcon}>
            <MultiIcon paths={ICONS.tag} size={18} />
          </div>
          <div>
            <h1 className={Styles.title}>Categories</h1>
            <p className={Styles.subtitle}>Manage &amp; organise stock market categories</p>
          </div>
        </div>

        {/* Right — Search + Add */}
        <div className={Styles.headerRight}>
          {/* Search bar */}
          <div className={Styles.searchWrap}>
            <span className={Styles.searchIcon}><MultiIcon paths={ICONS.search} size={14} /></span>
            <input
              className={Styles.searchInput}
              placeholder="Search categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  className={Styles.searchClear}
                  onClick={() => setSearch("")}
                  initial={{ opacity:0, scale:0.7 }}
                  animate={{ opacity:1, scale:1 }}
                  exit={{   opacity:0, scale:0.7 }}
                  transition={{ duration: 0.15 }}
                  whileTap={{ scale: 0.85 }}
                >
                  <MultiIcon paths={ICONS.x} size={11} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Add / Cancel toggle */}
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.button
                key="add"
                className={Styles.addBtn}
                onClick={openAdd}
                initial={{ opacity:0, scale:0.88 }}
                animate={{ opacity:1, scale:1 }}
                exit={{   opacity:0, scale:0.88 }}
                whileHover={{ scale:1.04, boxShadow:"0 0 28px rgba(0,229,160,0.3)" }}
                whileTap={{ scale:0.95 }}
                transition={{ duration:0.2 }}
              >
                <MultiIcon paths={ICONS.plus} size={14} />
                Add Category
              </motion.button>
            ) : (
              <motion.button
                key="cancel"
                className={Styles.cancelBtn}
                onClick={closeForm}
                initial={{ opacity:0, scale:0.88 }}
                animate={{ opacity:1, scale:1 }}
                exit={{   opacity:0, scale:0.88 }}
                whileHover={{ scale:1.04 }}
                whileTap={{ scale:0.95 }}
                transition={{ duration:0.2 }}
              >
                <MultiIcon paths={ICONS.x} size={13} />
                {isEditing ? "Cancel Edit" : "Cancel"}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ══════════════════════════════════
          COLLAPSIBLE FORM
      ══════════════════════════════════ */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className={`${Styles.formCard} ${isEditing ? Styles.formEdit : ""}`}
            initial={{ opacity:0, height:0, marginBottom:0 }}
            animate={{ opacity:1, height:"auto", marginBottom:20 }}
            exit={{   opacity:0, height:0, marginBottom:0 }}
            transition={{ duration:0.38, ease:[0.22,1,0.36,1] }}
            style={{ overflow:"hidden" }}
          >
            <div className={Styles.formInner}>
              {/* Form label */}
              <div className={Styles.formTop}>
                <div className={Styles.formMeta}>
                  <span className={`${Styles.fDot} ${isEditing ? Styles.fDotAmber : Styles.fDotGreen}`} />
                  <span className={Styles.formMetaText}>
                    {isEditing
                      ? `Editing → "${categorys.find(c => c.id === editId)?.category_name}"`
                      : "New Category"}
                  </span>
                </div>
                <span className={Styles.formHint}>Press Enter to submit</span>
              </div>

              {/* Input row */}
              <div className={Styles.formRow}>
                <div className={Styles.inputWrap}>
                  <span className={Styles.inputPre}>
                    <MultiIcon paths={ICONS.list} size={14} />
                  </span>
                  <input
                    autoFocus
                    className={Styles.input}
                    type="text"
                    placeholder={isEditing ? "Update category name..." : "e.g. Technology, Energy, Finance..."}
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  />
                  {category && (
                    <span className={Styles.inputCount}>{category.length}</span>
                  )}
                </div>

                <motion.button
                  className={`${Styles.submitBtn} ${isEditing ? Styles.submitAmber : Styles.submitGreen}`}
                  onClick={handleSubmit}
                  disabled={!category.trim() || submitting}
                  whileHover={{ scale:1.04 }}
                  whileTap={{ scale:0.95 }}
                >
                  {submitting
                    ? <span className={Styles.spinner} />
                    : isEditing
                      ? <><MultiIcon paths={ICONS.check} size={13} /> Update</>
                      : <><MultiIcon paths={ICONS.plus}  size={13} /> Add Category</>
                  }
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════
          TABLE CARD
      ══════════════════════════════════ */}
      <motion.div
        className={Styles.tableCard}
        initial={{ opacity:0, y:18 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.45, delay:0.15, ease:[0.22,1,0.36,1] }}
      >
        {/* Table toolbar */}
        <div className={Styles.toolbar}>
          <div className={Styles.toolbarLeft}>
            <span className={Styles.toolbarTitle}>All Categories</span>
            {search && (
              <motion.span
                className={Styles.filterBadge}
                initial={{ opacity:0, scale:0.85 }}
                animate={{ opacity:1, scale:1 }}
                exit={{   opacity:0, scale:0.85 }}
              >
                Filtered: {filtered.length} of {categorys.length}
              </motion.span>
            )}
          </div>
          <div className={Styles.toolbarRight}>
            <div className={Styles.liveTag}>
              <span className={Styles.liveDot} />
              LIVE DATA
            </div>
          </div>
        </div>

        {/* Table */}
        <div className={Styles.tableWrap}>
          <table className={Styles.table}>
            <thead>
              <tr>
                <th className={Styles.thSl}>#</th>
                <th>Category Name</th>
                <th className={Styles.thAct}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Loading */}
              {loading && (
                <tr><td colSpan={3} className={Styles.centerCell}>
                  <div className={Styles.loader}><span/><span/><span/></div>
                </td></tr>
              )}

              {/* No results from search */}
              {!loading && categorys.length > 0 && filtered.length === 0 && (
                <tr><td colSpan={3} className={Styles.centerCell}>
                  <motion.div className={Styles.emptyState}
                    initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}>
                    <MultiIcon paths={ICONS.search} size={30} />
                    <span>No match for "<strong>{search}</strong>"</span>
                    <button className={Styles.clearSearchBtn} onClick={() => setSearch("")}>
                      Clear search
                    </button>
                  </motion.div>
                </td></tr>
              )}

              {/* Fully empty */}
              {!loading && categorys.length === 0 && (
                <tr><td colSpan={3} className={Styles.centerCell}>
                  <motion.div className={Styles.emptyState}
                    initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}>
                    <MultiIcon paths={ICONS.tag} size={34} />
                    <span>No categories yet</span>
                    <button className={Styles.emptyAddBtn} onClick={openAdd}>
                      <MultiIcon paths={ICONS.plus} size={12} /> Add your first category
                    </button>
                  </motion.div>
                </td></tr>
              )}

              {/* Rows */}
              <AnimatePresence>
                {!loading && filtered.map((r, i) => (
                  <motion.tr
                    key={r.id}
                    className={`${Styles.tr} ${editId === r.id ? Styles.trHighlight : ""}`}
                    initial={{ opacity:0, x:-14 }}
                    animate={{ opacity:1, x:0 }}
                    exit={{   opacity:0, x:20, transition:{ duration:0.18 } }}
                    transition={{ delay:i*0.04, duration:0.26, ease:[0.22,1,0.36,1] }}
                    layout
                  >
                    {/* # */}
                    <td className={Styles.tdSl}>
                      <span className={Styles.slBadge}>{i + 1}</span>
                    </td>

                    {/* Name */}
                    <td>
                      <div className={Styles.nameCell}>
                        <span className={Styles.nameDot} />
                        <span className={Styles.nameText}>{r.category_name}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className={Styles.tdAct}>
                      <AnimatePresence mode="wait">
                        {deleteConfirm === r.id ? (
                          <motion.div key="confirm" className={Styles.confirmRow}
                            initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                            exit={{ opacity:0, scale:0.9 }} transition={{ duration:0.16 }}>
                            <span className={Styles.confirmLabel}>Confirm delete?</span>
                            <motion.button className={Styles.yesBtn} onClick={() => handleDelete(r.id)}
                              whileHover={{ scale:1.06 }} whileTap={{ scale:0.94 }}>
                              <MultiIcon paths={ICONS.check} size={11} /> Yes
                            </motion.button>
                            <motion.button className={Styles.noBtn} onClick={() => setDeleteConfirm(null)}
                              whileHover={{ scale:1.06 }} whileTap={{ scale:0.94 }}>
                              <MultiIcon paths={ICONS.x} size={11} /> No
                            </motion.button>
                          </motion.div>
                        ) : (
                          <motion.div key="btns" className={Styles.actRow}
                            initial={{ opacity:0 }} animate={{ opacity:1 }}
                            exit={{ opacity:0 }} transition={{ duration:0.14 }}>
                            <motion.button className={Styles.editBtn} onClick={() => openEdit(r)}
                              whileHover={{ scale:1.06, y:-1 }} whileTap={{ scale:0.93 }}>
                              <MultiIcon paths={ICONS.edit} size={12} /> Edit
                            </motion.button>
                            <motion.button className={Styles.delBtn} onClick={() => setDeleteConfirm(r.id)}
                              whileHover={{ scale:1.06, y:-1 }} whileTap={{ scale:0.93 }}>
                              <MultiIcon paths={ICONS.trash} size={12} /> Delete
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        {!loading && filtered.length > 0 && (
          <div className={Styles.tableFooter}>
            <span>Showing <strong>{filtered.length}</strong> of <strong>{categorys.length}</strong> categories</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Category;