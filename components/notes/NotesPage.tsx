"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";

import { PageHeader } from "../common/PageHeader";
import { GlassCard } from "@/app/theme/GlassCard";

type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  color: "lavender" | "pink" | "sage" | "blue";
  updatedAt: string;
};

const initialNotes: Note[] = [
  {
    id: "note-1",
    title: "Ideas for my week",
    content:
      "Keep the week simple. Focus on the things that actually matter and leave enough space to breathe.",
    category: "Personal",
    color: "lavender",
    updatedAt: "Today",
  },
  {
    id: "note-2",
    title: "Project ideas",
    content:
      "Write down the next few steps before starting. Break larger tasks into smaller pieces.",
    category: "Work",
    color: "blue",
    updatedAt: "Yesterday",
  },
  {
    id: "note-3",
    title: "Things I'm grateful for",
    content:
      "A quiet morning, finishing something difficult, learning something new, and having time for myself.",
    category: "Reflection",
    color: "pink",
    updatedAt: "2 days ago",
  },
  {
    id: "note-4",
    title: "Books to read",
    content:
      "Create a small reading list and choose one book at a time instead of collecting too many unfinished books.",
    category: "Learning",
    color: "sage",
    updatedAt: "3 days ago",
  },
];

const colorMap = {
  lavender: {
    background:
      "linear-gradient(145deg, rgba(216,197,242,0.34), rgba(255,255,255,0.55))",
    accent: "#9877CE",
    soft: "rgba(185,154,232,0.28)",
  },
  pink: {
    background:
      "linear-gradient(145deg, rgba(239,182,201,0.32), rgba(255,255,255,0.55))",
    accent: "#C18199",
    soft: "rgba(239,182,201,0.28)",
  },
  sage: {
    background:
      "linear-gradient(145deg, rgba(169,215,199,0.30), rgba(255,255,255,0.55))",
    accent: "#72A890",
    soft: "rgba(169,215,199,0.28)",
  },
  blue: {
    background:
      "linear-gradient(145deg, rgba(184,216,241,0.30), rgba(255,255,255,0.55))",
    accent: "#6E9FC3",
    soft: "rgba(184,216,241,0.28)",
  },
};

export function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [search, setSearch] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState(
    initialNotes[0]?.id ?? ""
  );
  const [isCreating, setIsCreating] = useState(false);

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return notes;
    }

    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.category.toLowerCase().includes(query)
    );
  }, [notes, search]);

  const selectedNote =
    notes.find((note) => note.id === selectedNoteId) ??
    filteredNotes[0] ??
    null;

  const handleCreateNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: "Untitled note",
      content: "",
      category: "Personal",
      color: "lavender",
      updatedAt: "Just now",
    };

    setNotes((current) => [newNote, ...current]);
    setSelectedNoteId(newNote.id);
    setIsCreating(true);
  };

  const handleDeleteNote = () => {
    if (!selectedNote) {
      return;
    }

    const remaining = notes.filter(
      (note) => note.id !== selectedNote.id
    );

    setNotes(remaining);
    setSelectedNoteId(remaining[0]?.id ?? "");
    setIsCreating(false);
  };

  const updateSelectedNote = (
    field: keyof Pick<
      Note,
      "title" | "content" | "category"
    >,
    value: string
  ) => {
    if (!selectedNote) {
      return;
    }

    setNotes((current) =>
      current.map((note) =>
        note.id === selectedNote.id
          ? {
              ...note,
              [field]: value,
              updatedAt: "Just now",
            }
          : note
      )
    );
  };

  return (
    <Box>
      <PageHeader
        eyebrow="YOUR THOUGHTS"
        title="Notes"
        description="Keep ideas, reflections, plans, and little thoughts in one calm place."
        action={
          <Button
            variant="contained"
            onClick={handleCreateNote}
            startIcon={
              <Icon
                icon="solar:add-circle-linear"
                width={19}
              />
            }
            sx={{
              background:
                "linear-gradient(135deg, #B99AE8, #CDAFEA)",
              color: "#FFFFFF",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #A98ADB, #C09FE2)",
              },
            }}
          >
            New note
          </Button>
        }
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "330px minmax(0, 1fr)",
          gap: 2,
          minHeight: 610,
        }}
      >
        {/* Notes list */}
        <GlassCard
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: 610,
          }}
        >
          <TextField
            fullWidth
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search notes..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon
                      icon="solar:magnifer-linear"
                      width={18}
                      color="#A19AA7"
                    />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              mb: 2,
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 0.5,
              mb: 1.2,
            }}
          >
            <Typography
              sx={{
                color: "#4B4350",
                fontSize: 13,
                fontWeight: 750,
              }}
            >
              All notes
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 11,
              }}
            >
              {filteredNotes.length}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 1,
              overflowY: "auto",
              pr: 0.4,
            }}
          >
            {filteredNotes.map((note) => {
              const colors = colorMap[note.color];
              const selected =
                note.id === selectedNote?.id;

              return (
                <Box
                  key={note.id}
                  onClick={() => {
                    setSelectedNoteId(note.id);
                    setIsCreating(false);
                  }}
                  sx={{
                    position: "relative",
                    p: 1.7,
                    cursor: "pointer",
                    borderRadius: "18px",
                    background: selected
                      ? colors.background
                      : "rgba(255,255,255,0.28)",
                    border: selected
                      ? `1px solid ${colors.soft}`
                      : "1px solid transparent",
                    transition:
                      "background-color 180ms ease, border-color 180ms ease",
                    "&:hover": {
                      background: colors.background,
                      borderColor: colors.soft,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.7,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        flexShrink: 0,
                        borderRadius: "50%",
                        background: colors.accent,
                      }}
                    />

                    <Typography
                      sx={{
                        color: "#4B4350",
                        fontSize: 13,
                        fontWeight: 750,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {note.title}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: 11.5,
                      lineHeight: 1.55,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      pl: 1.8,
                    }}
                  >
                    {note.content ||
                      "No content yet..."}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1.2,
                      pl: 1.8,
                    }}
                  >
                    <Typography
                      sx={{
                        color: colors.accent,
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    >
                      {note.category}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#AAA3AE",
                        fontSize: 10,
                      }}
                    >
                      •
                    </Typography>

                    <Typography
                      sx={{
                        color: "#AAA3AE",
                        fontSize: 10,
                      }}
                    >
                      {note.updatedAt}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            {filteredNotes.length === 0 && (
              <Box
                sx={{
                  py: 6,
                  textAlign: "center",
                }}
              >
                <Icon
                  icon="solar:notes-minimalistic-linear"
                  width={30}
                  color="#B4ACB8"
                />

                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 12,
                    mt: 1,
                  }}
                >
                  No notes found
                </Typography>
              </Box>
            )}
          </Box>
        </GlassCard>

        {/* Editor */}
        <GlassCard
          sx={{
            p: 3.5,
            minHeight: 610,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.74), rgba(255,255,255,0.48))",
          }}
        >
          {selectedNote ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Editor header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      px: 1.3,
                      py: 0.65,
                      borderRadius: "999px",
                      background:
                        colorMap[selectedNote.color]
                          .soft,
                    }}
                  >
                    <Typography
                      sx={{
                        color:
                          colorMap[selectedNote.color]
                            .accent,
                        fontSize: 10.5,
                        fontWeight: 750,
                      }}
                    >
                      {selectedNote.category}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      color: "#A39BA8",
                      fontSize: 11,
                    }}
                  >
                    {selectedNote.updatedAt}
                  </Typography>
                </Box>

                <IconButton
                  onClick={handleDeleteNote}
                  sx={{
                    color: "#B09FA8",
                    "&:hover": {
                      color: "#C18199",
                      background:
                        "rgba(239,182,201,0.14)",
                    },
                  }}
                >
                  <Icon
                    icon="solar:trash-bin-trash-linear"
                    width={19}
                  />
                </IconButton>
              </Box>

              {/* Title */}
              <TextField
                fullWidth
                value={selectedNote.title}
                onChange={(event) =>
                  updateSelectedNote(
                    "title",
                    event.target.value
                  )
                }
                placeholder="Note title"
                variant="standard"
                slotProps={{
                  input: {
                    disableUnderline: true,
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#3F3946",
                    fontSize: 27,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.25,
                    py: 0,
                  },
                }}
              />

              {/* Content */}
              <TextField
                fullWidth
                multiline
                minRows={16}
                value={selectedNote.content}
                onChange={(event) =>
                  updateSelectedNote(
                    "content",
                    event.target.value
                  )
                }
                placeholder="Write anything..."
                variant="standard"
                slotProps={{
                  input: {
                    disableUnderline: true,
                  },
                }}
                sx={{
                  flex: 1,
                  mt: 2.5,

                  "& .MuiInput-root": {
                    alignItems: "flex-start",
                  },

                  "& .MuiInputBase-input": {
                    color: "#625B67",
                    fontSize: 14,
                    lineHeight: 1.9,
                    resize: "none",
                    padding: 0,
                  },

                  "& .MuiInput-root::before": {
                    display: "none",
                  },

                  "& .MuiInput-root::after": {
                    display: "none",
                  },
                }}
              />

              {/* Editor footer */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  mt: 2,
                  pt: 2,
                  borderTop:
                    "1px solid rgba(120,104,132,0.08)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,
                  }}
                >
                  <Icon
                    icon="solar:pen-new-square-linear"
                    width={15}
                    color="#A49CA8"
                  />

                  <Typography
                    sx={{
                      color: "#A49CA8",
                      fontSize: 10.5,
                    }}
                  >
                    Your thoughts, your space
                  </Typography>
                </Box>

                {isCreating && (
                  <Typography
                    sx={{
                      color: "#9877CE",
                      fontSize: 10.5,
                      fontWeight: 700,
                    }}
                  >
                    New note
                  </Typography>
                )}
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "grid",
                placeItems: "center",
                textAlign: "center",
              }}
            >
              <Box>
                <Box
                  sx={{
                    width: 68,
                    height: 68,
                    mx: "auto",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "22px",
                    background:
                      "rgba(216,197,242,0.25)",
                    color: "#9877CE",
                  }}
                >
                  <Icon
                    icon="solar:notebook-linear"
                    width={31}
                  />
                </Box>

                <Typography
                  sx={{
                    color: "#4B4350",
                    fontSize: 17,
                    fontWeight: 750,
                    mt: 2,
                  }}
                >
                  Your notes live here
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 12.5,
                    mt: 0.7,
                  }}
                >
                  Create a note and start writing.
                </Typography>
              </Box>
            </Box>
          )}
        </GlassCard>
      </Box>
    </Box>
  );
}